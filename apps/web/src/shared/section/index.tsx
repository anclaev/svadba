import Image, { ImageProps } from 'next/image'
import { CSSProperties, FC, PropsWithChildren } from 'react'

export type SectionProps = {
  alias: string
  title?: string
  image?: ImageProps
  className?: string
  style?: CSSProperties
}

export const Section: FC<PropsWithChildren<SectionProps>> = ({
  title,
  image,
  className,
  style,
  children,
}) => {
  return (
    <>
      {image && <Image {...image} alt={image.alt} className="select-none" />}
      <section
        className={`mt-8 lg:mt-16 mb-8 lg:mb-16 ${className ? className : ''}`}
        style={style}
      >
        {title && (
          <h2
            className="font-trajan text-xl sm:text-2xl md:text-3xl lg:text-4xl 
          pb-8 
          lg:pb-12 
          pl-5 pr-5 text-center"
          >
            {title}
          </h2>
        )}
        {children}
      </section>
    </>
  )
}
