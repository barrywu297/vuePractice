import { Response, Request } from 'express'
import { Hero, Player } from '../src/api/types'
import { heros } from './heros'
import faker from 'faker'

faker.locale = 'zh_CN'

// 模拟玩家数据
const customPlayerCount = 100
const customPlayerList: Player[] = []

for (let index = 0; index < customPlayerCount; index++) {
  customPlayerList.push({
    id: index,
    accountname: faker.name.findName(),
    avatar: faker.image.avatar(),
    bravepoints: faker.random.number(1000),
    exp: faker.random.number(100000),
    level: faker.random.number(30),
    nickname: faker.name.findName(),
    rank: faker.random.number(200),
    wanttoplay: genWantoplay(),
    winningstreak: faker.random.number(10)
  })
}

function genWantoplay() {
  let wanttoplay: Set<Hero> = new Set()
  while (wanttoplay.size < 3) {
    wanttoplay.add(heros[faker.random.number(9)])
  }
  return Array.from(wanttoplay)
}

// 路由实现
export const getCustomPlayers = (req: Request, res: Response) => {
  // 从查询参数中获取分页、过滤关键词等参数
  const { accountname, page = 1, limit = 10 } = req.query
  // 过滤
  const mockCustomPlayersList = customPlayerList.filter((item) => {
    if (accountname && item.accountname.indexOf(accountname) < 0) {
      return false
    }
    return true
  })
  // 分页
  const pageCustomPlayersList = mockCustomPlayersList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

  res.json({
    code: 20000,
    data: {
      total: mockCustomPlayersList.length,
      customPlayers: pageCustomPlayersList
    }
  })
}

export const getCustomPlayer = (req: Request, res: Response) => {
  const { id } = req.params
  for (const customPlayer of customPlayerList) {
    if (customPlayer.id.toString() === id) {
      return res.json({
        code: 20000,
        data: {
          customPlayer
        }
      })
    }
  }
}

// 创建玩家
export const createCustomPlayer = (req: Request, res: Response) => {
  // 新增的玩家数据
  const { customPlayer } = req.body
  // 直接返回数据
  res.json({
    code: 20000,
    data: {
      customPlayer
    }
  })
}
// 更新玩家
export const updateCustomPlayer = (req: Request, res: Response) => {
  // 新增的玩家数据
  const { id } = req.params
  const { customPlayer } = req.body
  for (const customPlayer of customPlayerList) {
    if (customPlayer.id.toString() === id) {
      return res.json({
        code: 20000,
        data: {
          customPlayer
        }
      })
    }
  }
  // 直接返回
  res.json({
    code: 70001,
    message: '没有找到响应玩家信息'
  })
}
// 删除玩家
export const deletePlayer = (req: Request, res: Response) => {
  // 直接返回
  res.json({
    code: 2000,
    message: '删除玩家信息成功'
  })
}
