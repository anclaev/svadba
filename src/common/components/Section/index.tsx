import { FC } from 'react'

import { WithChildren, WithClass } from '@interfaces/props'

import './Section.css'

export type SectionProps = {
  title: string
} & WithClass &
  WithChildren

export const Section: FC<SectionProps> = ({ title, children, className }) => {
  return (
    <section className={`section ${className ? className : ''}`}>
      <h2 className='section__title'>{title}</h2>
      {children}
    </section>
  )
}
