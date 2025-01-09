import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { FLOWERS, FlowerType } from './consts'

interface User  {
  login: string
  password: string
  phone?: string
  email?: string
  role: ' ' | 'ADMIN' | 'USER' 
}

export interface Flower {
  id: number
  src: string
  isNew?: boolean 
  name: string
  price: number 
  flowers: FlowerType[]
  description: string
  inStock: number
}

type Store = {
  users: User[]
  user?: User
  flowers:Record<number, Flower>
  basket: Record<number, { id: number, count: number}>

  buy: () => void
  addToBasket: (id: number) => void 
  removeFromBasket: (id: number, isAll?: boolean) => void 
  register: (user: Omit<User, 'role'>, onSuccess: () => void, onError: (error: string) => void) => void
  login: (user: Omit<User, 'role'>, onSuccess: () => void, onError: (error: string) => void) => void
  logout: () => void

  addToCatalog: (flower: Flower) => void 
}

export const useFlower = create<Store>()(
  immer((set, get) => ({
    users: [{login: ' ', password: ' ', role: ' '}, {login: 'ADMIN', password: 'ADMIN', role: 'ADMIN'}],
    user: {login: 'ADMIN', password: 'ADMIN', role: ' '},
    flowers: FLOWERS,
    basket: {},
    register: (user, onSuccess, onError) => set((state) => {
      if (!user.login || !user.password) return onError('Введите логин и пароль')
      const newUser: User = {...user, role: 'USER'}

      if (get().users.find(us => us.login === user.login)) return onError('Пользователь с таким логином уже существует')

      state.users.push(newUser)
      state.user = newUser
      onError('')
      onSuccess()
    }),
    login: (user, onSuccess, onError) => set((state) => {

      if (!user.login || !user.password) return onError('Введите логин и пароль')

      const foundUser = get().users.find((initUser) => initUser.login === user.login && initUser.password === user.login)

      if (!foundUser) return onError('Логин или пароль введены неверно')
      
      state.user = foundUser
      onError('')
      onSuccess()
    }),
    logout: () => set((state) => {
      state.user = undefined
    }),

    addToBasket: (id) => {
      if (!get().flowers[id]?.inStock) return

      set((state) => {
        state.basket[id] = {
          count: (state.basket?.[id]?.count || 0) + 1,
          id
        }

        const initFlower = state.flowers[id]
        state.flowers[id] = {...initFlower, inStock: initFlower.inStock - 1}
    })},
    removeFromBasket: (id, isAll) => {
      if (!get().basket?.[id]) return


      set((state) => {

        const count = isAll ? state.basket?.[id]?.count || 0 : 1

        state.basket[id] = {
          count: (state.basket?.[id]?.count || 0) - count,
          id
        }

        const initFlower = state.flowers[id]
        
        state.flowers[id] = {...initFlower, inStock: initFlower.inStock + count}
    })},
    buy: () => set((state) => {
      state.basket = {}
    }),
    addToCatalog: (flower) => set((state)=> {
      state.flowers = {...state.flowers, 
        [flower.id]: flower
      }
    })
  })),
)
