import { FC } from 'react'
import spinnerImage from '../../../src/images/spinner.svg'

const Loader: FC = () => {
  return (
    <img
      className="object-none object-center m-auto"
      src={spinnerImage}
      alt="loader"
      width={100}
      height={100}
    />
  )
}

export default Loader
