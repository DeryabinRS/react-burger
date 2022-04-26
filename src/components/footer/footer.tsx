import { Logo } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from  './footer.module.css'

const Footer = () => {
  return (
      <div className={`${styles.footer} mt-10`}>
          <div className="container p-5"><Logo/></div>
      </div>
  )
}

export default Footer