import { SocialLink } from '#prisma'

export const mockSocialLinks: SocialLink[] = [
  {
    id: '8aef09fb-d437-6345-b457-1b78142c7e15',
    alias: 'telegram',
    creatorId: '8aef09fb-d437-4819-b457-1b78142c7e15',
    href: 'https://t.me/test',
    icon: null,
    title: 'Telegram',
    createdAt: new Date(),
  },
  {
    id: '8aef09fb-d437-9864-b457-1b78142c7e15',
    alias: 'instagram',
    creatorId: '8aef09fb-d437-4819-b457-1b78142c7e15',
    href: 'https://instagram.com/test',
    icon: null,
    title: 'Instagram',
    createdAt: new Date(),
  },
]
