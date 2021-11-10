import request from '@/utils/request'
import { Player } from './types'

export const defaultPlayerData: Player = {
  accountname: '',
  nickname: '',
  avatar: '',
  bravepoints: 0,
  exp: 0,
  id: 0,
  level: 0,
  rank: 0,
  wanttoplay: [],
  winningstreak: 0
}

export const getCustomPlayers = (params: any) =>
  request({
    url: '/customPlayers',
    method: 'get',
    params
  })

export const getCustomPlayer = (id: number) =>
  request({
    url: '/customPlayers/' + id.toString(),
    method: 'get'
  })

export const createCustomPlayer = (data: any) =>
  request({
    url: '/customPlayers',
    method: 'post',
    data
  })

export const updateCustomPlayer = (id: number, data: any) =>
  request({
    url: '/customPlayers' + id,
    method: 'put',
    data
  })

export const deleteCustomPlayer = (id: number) =>
  request({
    url: '/customPlayers/' + id.toString(),
    method: 'delete'
  })
