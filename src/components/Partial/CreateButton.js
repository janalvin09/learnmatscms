import React from 'react'
import { Link } from 'react-router-dom'

export const CreateButton = ({ destination, label, styles }) => {
  return (
    <Link to={destination}>
      <button className={styles}>
        {label}
      </button>
    </Link>
  )
}
