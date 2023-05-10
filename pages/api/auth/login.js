import start from '../../../common/lib/utils/start'
import User from '../../../common/models/User'
import * as bcrypt from 'bcryptjs'

start()

export default async function handler(req, res) {

  switch (req.method) {
    case 'POST':
      try {
        const { username, password } = req.body

        const user = await User.findOne({ username })

        if (!user) return res.status(401).json('Invalid username')

        const isMatchedPassword = await bcrypt.compare(password, user.password)

        if (!isMatchedPassword) return res.status(401).json('Invalid password')

        return res.status(200).json(user)

      } catch (error) {
        return res.status(400).json(error)
      }
    default:
      res.setHeader('Allow', ['POST'])
      res.status(425).end(`Method ${req.method} is not allowed.`)
  }
}

