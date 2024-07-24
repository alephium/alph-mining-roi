'use client'

import { Button, Grid, Group, NativeSelect, Space, Stack, Table, Text, TextInput, rem } from '@mantine/core'
import { Welcome } from '../components/Welcome/Welcome'
import { useForm } from '@mantine/form'
import { useCallback, useEffect, useState } from 'react'
import { convertHttpResponse, NodeProvider } from '@alephium/web3'

type MinerInfo = { hashrate: number; power: number; cost: number }
const asicMiners: Record<string, MinerInfo> =
  {
    'Custom ASIC Miner': {
      hashrate: 1.0,
      power: 1.0,
      cost: 10000,
    },
    'Bitmain Antminer L1 (with coupon)': {
      hashrate: 15.6,
      power: 3.51,
      cost: 29260,
    },
    'Bitmain Antminer L1 (without coupon)': {
      hashrate: 15.6,
      power: 3.51,
      cost: 41800,
    },
    'Ice River ALPH AL0': {
      hashrate: 0.4,
      power: 0.1,
      cost: 799,
    },
    'Goldshell AL BOX II': {
      hashrate: 1.440,
      power: 0.36,
      cost: 6350,
    },
  }

const stableRewardDate = new Date('2025-11-08')
const stableRewardPerBlock = 0.3125 // approximately
const dailyDecreaseUntilStable = 0.000428 // approximately

const nodeUrl = 'https://node.mainnet.alephium.org'
const explorerUrl = 'https://backend.mainnet.alephium.org'

function calDaysUntilStable() {
  const today = new Date()
  const days = (stableRewardDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  return days
}

function calCurrentDailyEmission() {
  const days = calDaysUntilStable()
  return stableRewardPerBlock + days * dailyDecreaseUntilStable
}

export default function HomePage() {
  const form = useForm({
    initialValues: {
      minerCost: 10000,
      minerHashrate: 1.0,
      minerPower: 1.0,
      electricityCost: 0.1,
      networkHashrate: 0.0,
      alphPrice: 2.0,
    },
    validate: {
      minerCost: (value) => value > 0 ? undefined : 'Cost must be positive',
      minerHashrate: (value) => value > 0 ? undefined : 'Hashrate must be positive',
      minerPower: (value) => value > 0 ? undefined : 'Power must be positive',
      electricityCost: (value) => value > 0 ? undefined : 'Electricity cost must be positive',
      networkHashrate: (value) => value > 0 ? undefined : 'Network hashrate must be positive',
      alphPrice: (value) => value > 0 ? undefined : 'ALPH price must be positive'
    },
  })

  const result = useForm({
    initialValues: {
      breakEvenDays: undefined as number | string | undefined,
      breakEvenAlph: undefined as number | undefined,
      minedAlph1day: undefined as number | undefined,
      minedAlph7day: undefined as number | undefined,
      minedAlph1month: undefined as number | undefined,
      minedAlph6month: undefined as number | undefined,
      minedAlph1year: undefined as number | undefined,
    },
  })

  const [asicMiner, setAsicMiner] = useState('Custom')
  const [currentHashrate, setCurrentHashrate] = useState(undefined as number | undefined)

  useEffect(() => {
    const minerInfo = asicMiners[asicMiner] as MinerInfo | undefined
    if (minerInfo) {
      form.setValues({
        minerCost: minerInfo.cost,
        minerHashrate: minerInfo.hashrate,
        minerPower: minerInfo.power,
      })
    }
  }, [asicMiner])

  // fetch the current network hashrate
  useEffect(() => {
    const handle = async () => {
      const now = Date.now()
      const oneDayBefore = now - 24 * 3600 * 1000 - 1
      const res0 = await fetch(explorerUrl + `/charts/hashrates?fromTs=${oneDayBefore}&toTs=${now}&interval-type=daily`)
      if (res0.status === 200) {
        const res1 = await res0.json()
        const hashrate = res1[0].hashrate
        const ths = parseFloat(hashrate) / (10 ** 12)
        setCurrentHashrate(Math.ceil(ths))
      }

      const res2 = await fetch(explorerUrl + '/market/prices?currency=usd', {
        method: "POST",
        body: JSON.stringify(["ALPH"]),
      })
      if (res2.status === 200) {
        const res3 = await res2.json()
        const price = res3[0]
        form.setValues({ alphPrice: price })
      }
    }

    handle()
  }, [])

  const calculateMinedAlphBeforeStable = useCallback((currentDailyEmission: number, days: number) => {
    const averageDailyEmission = currentDailyEmission - dailyDecreaseUntilStable * (days - 1) / 2
    const minedAlph = days * averageDailyEmission * (24 * 3600) * form.values.minerHashrate / form.values.networkHashrate
    return minedAlph
  }, [form])

  const calculate = useCallback(() => {
    const daysUntilStable = calDaysUntilStable()
    const currentDailyEmission = calCurrentDailyEmission()
    const dayIndexesUntilStable = Array.from({ length: daysUntilStable }, (_, i) => i + 1)
    const minedAlphBeforeStable = dayIndexesUntilStable.map((day) =>
      calculateMinedAlphBeforeStable(currentDailyEmission, day)
    )
    const profitsBeforeStable = minedAlphBeforeStable.map(
      (minedAlph, index) =>
        minedAlph * form.values.alphPrice -
        form.values.electricityCost * 24 * form.values.minerPower * (index + 1)
    )
    const breakEvenDays = profitsBeforeStable.findIndex((profit) => profit > form.values.minerCost)
    if (breakEvenDays !== -1) {
      result.setValues({
        breakEvenDays: breakEvenDays + 1,
        breakEvenAlph: minedAlphBeforeStable[breakEvenDays],
        minedAlph1day: minedAlphBeforeStable[0],
        minedAlph7day: minedAlphBeforeStable[6],
        minedAlph1month: minedAlphBeforeStable[29],
        minedAlph6month: minedAlphBeforeStable[179],
        minedAlph1year: minedAlphBeforeStable[364],
      })
    } else {
      result.setValues({
        breakEvenDays: `> ${daysUntilStable}`,
        breakEvenAlph: undefined,
        minedAlph1day: minedAlphBeforeStable[0],
        minedAlph7day: minedAlphBeforeStable[6],
        minedAlph1month: minedAlphBeforeStable[29],
        minedAlph6month: minedAlphBeforeStable[179],
        minedAlph1year: minedAlphBeforeStable[364],
      })
    }
  }, [form])

  return (
    <Stack
      justify='center'
      align='center'
      gap={rem(24)}
      mx='auto'
      mt={32}
    >
      <Welcome />
      <Text c='dimmed' ta='center' size='lg' maw={580} mx='auto'>
        This is a simple ROI calculator for ALPH mining based on the current network hashrate and ALPH price. Not Financial Advice.
      </Text>
      <Text c='blue' ta='center' size='lg' maw={580} mx='auto'>
        The network hashrate might be much higher than the current value in the future. Please take this into consideration.
      </Text>
      <NativeSelect
        miw={300}
        label='Select ASIC Miner'
        description='Randomly ordered list of ASIC miners'
        data={Object.keys(asicMiners)}
        value={asicMiner}
        onChange={(event) => setAsicMiner(event.currentTarget.value)}
      />
      <form onSubmit={form.onSubmit((values) => { console.log(values); calculate()})}>
      <Grid mx="auto" w='60%' gutter={'lg'}>
        <Grid.Col span={{ base: 12, xs: 4 }}>
          <TextInput
            type='number'
            label='Miner Cost'
            placeholder='10000'
            rightSection={
              <Text mr='md' fw='bold'>
                USD
              </Text>
            }
            key={form.key('minerCost')}
            {...form.getInputProps('minerCost')}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, xs: 4 }}>
          <TextInput
            type='number'
            label='Miner Hashrate'
            placeholder='1.0'
            rightSection={
              <Text mr='md' fw='bold'>
                TH/s
              </Text>
            }
            key={form.key('minerHashrate')}
            {...form.getInputProps('minerHashrate')}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, xs: 4 }}>
          <TextInput
            type='number'
            label='Miner Power'
            placeholder='1.0'
            rightSection={
              <Text mr='md' fw='bold'>
                kW
              </Text>
            }
            {...form.getInputProps('minerPower')}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, xs: 4 }}>
          <TextInput
            type='number'
            label='Electricity Cost'
            placeholder='1.0'
            rightSection={
              <Text mr='md' fw='bold'>
                USD/kWh
              </Text>
            }
            rightSectionWidth={70}
            {...form.getInputProps('electricityCost')}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, xs: 4 }}>
          <TextInput
            type='number'
            label={`Network Hashrate ${ currentHashrate ? `(Current: ${currentHashrate} TH/s)` : ''}`}
            placeholder='1.0'
            rightSection={
              <Text mr='md' fw='bold'>
                Th/s
              </Text>
            }
            {...form.getInputProps('networkHashrate')}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, xs: 4 }}>
          <TextInput
            type='number'
            label='ALPH Price'
            placeholder='1.0'
            rightSection={
              <Text mr='md' fw='bold'>
                USD
              </Text>
            }
            {...form.getInputProps('alphPrice')}
          />
        </Grid.Col>
      </Grid>
      <Group justify="center" mt="md">
        <Button type="submit">Calculate</Button>
      </Group>
      </form>
      <Table w='60%' highlightOnHover withTableBorder>
        <Table.Thead>
          <Table.Tr>
            <Table.Td w="30%">break-even</Table.Td>
            <Table.Td w="30%">{result.values.breakEvenDays ?? '???'} days</Table.Td>
            <Table.Td w="30%">{result.values.breakEvenAlph ?? '???'} ALPH</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td>1 day</Table.Td>
            <Table.Td>{result.values.minedAlph1day ? result.values.minedAlph1day * form.values.alphPrice : '???'} USD</Table.Td>
            <Table.Td>{result.values.minedAlph1day ?? '???'} ALPH</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td>7 day</Table.Td>
            <Table.Td>{result.values.minedAlph7day ? result.values.minedAlph7day * form.values.alphPrice : '???'} USD</Table.Td>
            <Table.Td>{result.values.minedAlph7day ?? '???'} ALPH</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td>1 month</Table.Td>
            <Table.Td>{result.values.minedAlph1month ? result.values.minedAlph1month * form.values.alphPrice : '???'} USD</Table.Td>
            <Table.Td>{result.values.minedAlph1month ?? '???'} ALPH</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td>6 month</Table.Td>
            <Table.Td>{result.values.minedAlph6month ? result.values.minedAlph6month * form.values.alphPrice : '???'} USD</Table.Td>
            <Table.Td>{result.values.minedAlph6month ?? '???'} ALPH</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td>1 year</Table.Td>
            <Table.Td>{result.values.minedAlph1year ? result.values.minedAlph1year * form.values.alphPrice : '???'} USD</Table.Td>
            <Table.Td>{result.values.minedAlph1year ?? '???'} ALPH</Table.Td>
          </Table.Tr>
        </Table.Thead>
      </Table>
    </Stack>
  )
}
