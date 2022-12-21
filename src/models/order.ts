import client from '../database'

export interface Order {
  id?: number
  category: string
  user_id: number
  status: number
}

export class OrderList {
  async index (): Promise<Order[]> {
    try {
      const conn = await client.connect()
      const sql = 'SELECT * FROM orders'
      const result = await conn.query(sql)
      conn.release()
      return result.rows
    } catch (err) {
      throw new Error(`Cannot get orders ${err}`)
    }
  }
}
