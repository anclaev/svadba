import * as Inputs from '@graphql/__generated__/inputs';
import { builder } from '../../builder';
import {
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils';

export const GuestObject = definePrismaObject('Guest', {
  description: undefined,
  findUnique: ({ id }) => ({ id }),
  fields: (t) => ({
    id: t.field(GuestIdFieldObject),
    familyId: t.field(GuestFamilyIdFieldObject),
    status: t.field(GuestStatusFieldObject),
    password: t.field(GuestPasswordFieldObject),
    email: t.field(GuestEmailFieldObject),
    first_name: t.field(GuestFirst_nameFieldObject),
    last_name: t.field(GuestLast_nameFieldObject),
    side: t.field(GuestSideFieldObject),
    type: t.field(GuestTypeFieldObject),
    age: t.field(GuestAgeFieldObject),
    sex: t.field(GuestSexFieldObject),
    table: t.field(GuestTableFieldObject),
    transfer: t.field(GuestTransferFieldObject),
    accommodation: t.field(GuestAccommodationFieldObject),
    family: t.relation('family', GuestFamilyFieldObject),
    ownedFamily: t.relation('ownedFamily', GuestOwnedFamilyFieldObject),
    events: t.relation('events', GuestEventsFieldObject(t)),
    createdAt: t.field(GuestCreatedAtFieldObject),
    updatedAt: t.field(GuestUpdatedAtFieldObject),
  }),
});

export const GuestIdFieldObject = defineFieldObject('Guest', {
  type: "ID",
  description: undefined,
  nullable: false,
  resolve: (parent) => String(parent.id),
});

export const GuestFamilyIdFieldObject = defineFieldObject('Guest', {
  type: "String",
  description: undefined,
  nullable: true,
  resolve: (parent) => parent.familyId,
});

export const GuestStatusFieldObject = defineFieldObject('Guest', {
  type: Inputs.Status,
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.status,
});

export const GuestPasswordFieldObject = defineFieldObject('Guest', {
  type: "String",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.password,
});

export const GuestEmailFieldObject = defineFieldObject('Guest', {
  type: "String",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.email,
});

export const GuestFirst_nameFieldObject = defineFieldObject('Guest', {
  type: "String",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.first_name,
});

export const GuestLast_nameFieldObject = defineFieldObject('Guest', {
  type: "String",
  description: undefined,
  nullable: true,
  resolve: (parent) => parent.last_name,
});

export const GuestSideFieldObject = defineFieldObject('Guest', {
  type: Inputs.Side,
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.side,
});

export const GuestTypeFieldObject = defineFieldObject('Guest', {
  type: Inputs.Type,
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.type,
});

export const GuestAgeFieldObject = defineFieldObject('Guest', {
  type: Inputs.Age,
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.age,
});

export const GuestSexFieldObject = defineFieldObject('Guest', {
  type: Inputs.Sex,
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.sex,
});

export const GuestTableFieldObject = defineFieldObject('Guest', {
  type: "Int",
  description: undefined,
  nullable: true,
  resolve: (parent) => parent.table,
});

export const GuestTransferFieldObject = defineFieldObject('Guest', {
  type: "Boolean",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.transfer,
});

export const GuestAccommodationFieldObject = defineFieldObject('Guest', {
  type: "Boolean",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.accommodation,
});

export const GuestFamilyFieldObject = defineRelationObject('Guest', 'family', {
  description: undefined,
  nullable: true,
  args: undefined,
  query: undefined,
});

export const GuestOwnedFamilyFieldObject = defineRelationObject('Guest', 'ownedFamily', {
  description: undefined,
  nullable: true,
  args: undefined,
  query: undefined,
});

export const GuestEventsFieldArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.EventWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.EventOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.EventWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.EventScalarFieldEnum], required: false }),
}))

export const GuestEventsFieldObject = defineRelationFunction('Guest', (t) =>
  defineRelationObject('Guest', 'events', {
    description: undefined,
    nullable: false,
    args: GuestEventsFieldArgs,
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

export const GuestCreatedAtFieldObject = defineFieldObject('Guest', {
  type: Inputs.DateTime,
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.createdAt,
});

export const GuestUpdatedAtFieldObject = defineFieldObject('Guest', {
  type: Inputs.DateTime,
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.updatedAt,
});
