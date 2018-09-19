import React from 'react'
import Welcome from './Welcome'

import FirstTotalCount from './FirstTotalCount'
import SecondTotalCount from './SecondTotalCount'
import ThirdTotalCount from './ThirdTotalCount'
import ForthTotalCount from './ForthTotalCount'

const styles = {
  card: {
    borderLeft: 'solid 4px #ff9800',
    flex: 1,
    marginLeft: '1em'
  },
  icon: {
    float: 'right',
    width: 80,
    height: 80,
    padding: 16,
    color: '#ff9800'
  },
  welcome: {
    marginBottom: '2em'
  },
  flex: {
    display: 'flex'
  },
  leftCol: {
    flex: 1,
    marginRight: '1em'
  },
  rightCol: {
    flex: 1,
    marginLeft: '1em'
  },
  singleCol: {
    marginTop: '2em'
  },
}

class Dashboard extends React.Component {
  render() {
    const welcome = <Welcome style={styles.welcome} />
    return (
      <div>
        {welcome}
        <div style={styles.flex}>
          <div style={styles.leftCol}>
            <div style={styles.flex}>
              <FirstTotalCount value={25} />
            </div>
            <div style={styles.singleCol}>
              <SecondTotalCount value={26} />
            </div>
          </div>
          <div style={styles.rightCol}>
            <div style={styles.flex}>
              <ThirdTotalCount value={27} />
            </div>
            <div style={styles.singleCol}>
              <ForthTotalCount value={28} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Dashboard