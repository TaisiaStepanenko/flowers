import { Flower } from "./store";

export type FlowerType = 
  | 'TULIPS'
  | 'ROSES'
  | 'PEONIES'
  | 'GERBERAS'
  | 'LILIES'
  | 'DAHLIAS'

export const FLOWER_TYPE: Record<FlowerType, {en: FlowerType, ru: string}> = {
  TULIPS: {en: 'TULIPS', ru: "Тюльпаны"}, 
  ROSES: {en: 'ROSES', ru: "Розы"}, 
  PEONIES: {en: 'PEONIES', ru: "Пионы"}, 
  GERBERAS: {en: 'GERBERAS', ru: "Герберы"}, 
  LILIES: {en: 'LILIES', ru: "Лилии"}, 
  DAHLIAS: {en: 'DAHLIAS', ru: "Георгины"} 
}


export const FLOWERS: Record<number, Flower> = {
  1: {
  id: 1,
  src: '6',
  description: 'Красивые цветы',
  name: 'Букет “Любовь”',
  price: 1800,
  flowers: ['ROSES', 'DAHLIAS'],
  inStock: 1
},
2: {
  id: 2,
  src: '2',
  description: 'Красивые цветы',
  name: 'Букет “Тюльпаны”',
  price: 2500,
  flowers: ['TULIPS'],
  inStock: 2
},
3: {
  id: 3,
  src: '6',
  description: 'Красивые цветы',
  name: 'Букет “Любовь”',
  price: 1800,
  flowers: ['ROSES', 'DAHLIAS'],
  inStock: 1
},
4: {
  id: 4,
  src: '6',
  description: 'Красивые цветы',
  name: 'Букет “Любовь”',
  price: 1800,
  flowers: ['ROSES', 'DAHLIAS'],
  inStock: 1
},
5: {
  id: 5,
  src: '6',
  description: 'Красивые цветы',
  name: 'Букет “Любовь”',
  price: 1800,
  flowers: ['ROSES', 'DAHLIAS'],
  inStock: 1
},}