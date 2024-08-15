import * as Inputs from '@graphql/__generated__/inputs';
import { builder } from '../../builder';
import {
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils';

export const EventObject = definePrismaObject('Event', {
  description: undefined,
  findUnique: ({ id }) => ({ id }),
  fields: (t) => ({
    id: t.field(EventIdFieldObject),
    index: t.field(EventIndexFieldObject),
    alias: t.field(EventAliasFieldObject),
    name: t.field(EventNameFieldObject),
    date: t.field(EventDateFieldObject),
    start: t.field(EventStartFieldObject),
    end: t.field(EventEndFieldObject),
    description: t.field(EventDescriptionFieldObject),
    address: t.field(EventAddressFieldObject),
    url: t.field(EventUrlFieldObject),
    guests: t.relation('guests', EventGuestsFieldObject(t)),
    createdAt: t.field(EventCreatedAtFieldObject),
    updatedAt: t.field(EventUpdatedAtFieldObject),
  }),
});

export const EventIdFieldObject = defineFieldObject('Event', {
  type: "ID",
  description: undefined,
  nullable: false,
  resolve: (parent) => String(parent.id),
});

export const EventIndexFieldObject = defineFieldObject('Event', {
  type: "Int",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.index,
});

export const EventAliasFieldObject = defineFieldObject('Event', {
  type: "String",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.alias,
});

export const EventNameFieldObject = defineFieldObject('Event', {
  type: "String",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.name,
});

export const EventDateFieldObject = defineFieldObject('Event', {
  type: Inputs.DateTime,
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.date,
});

export const EventStartFieldObject = defineFieldObject('Event', {
  type: Inputs.DateTime,
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.start,
});

export const EventEndFieldObject = defineFieldObject('Event', {
  type: Inputs.DateTime,
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.end,
});

export const EventDescriptionFieldObject = defineFieldObject('Event', {
  type: "String",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.description,
});

export const EventAddressFieldObject = defineFieldObject('Event', {
  type: "String",
  description: undefined,
  nullable: true,
  resolve: (parent) => parent.address,
});

export const EventUrlFieldObject = defineFieldObject('Event', {
  type: "String",
  description: undefined,
  nullable: true,
  resolve: (parent) => parent.url,
});

export const EventGuestsFieldArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.GuestWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.GuestOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.GuestWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.GuestScalarFieldEnum], required: false }),
}))

export const EventGuestsFieldObject = defineRelationFunction('Event', (t) =>
  defineRelationObject('Event', 'guests', {
    description: undefined,
    nullable: false,
    args: EventGuestsFieldArgs,
    query: (args) => ({
      where: args.where || undefined,
      cursor: args.cursor || undefined,
      take: args.take || undefined,
      distinct: args.distinct || undefined,
      skip: args.skip || undefined,
      orderBy: args.orderBy || undefined,
    }),
  }),
);

export const EventCreatedAtFieldObject = defineFieldObject('Event', {
  type: Inputs.DateTime,
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.createdAt,
});

export const EventUpdatedAtFieldObject = defineFieldObject('Event', {
  type: Inputs.DateTime,
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.updatedAt,
});
