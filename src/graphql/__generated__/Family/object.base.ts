import * as Inputs from '@graphql/__generated__/inputs';
import { builder } from '../../builder';
import {
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils';

export const FamilyObject = definePrismaObject('Family', {
  description: undefined,
  findUnique: ({ id }) => ({ id }),
  fields: (t) => ({
    id: t.field(FamilyIdFieldObject),
    ownerId: t.field(FamilyOwnerIdFieldObject),
    name: t.field(FamilyNameFieldObject),
    owner: t.relation('owner', FamilyOwnerFieldObject),
    members: t.relation('members', FamilyMembersFieldObject(t)),
    createdAt: t.field(FamilyCreatedAtFieldObject),
    updatedAt: t.field(FamilyUpdatedAtFieldObject),
  }),
});

export const FamilyIdFieldObject = defineFieldObject('Family', {
  type: "ID",
  description: undefined,
  nullable: false,
  resolve: (parent) => String(parent.id),
});

export const FamilyOwnerIdFieldObject = defineFieldObject('Family', {
  type: "String",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.ownerId,
});

export const FamilyNameFieldObject = defineFieldObject('Family', {
  type: "String",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.name,
});

export const FamilyOwnerFieldObject = defineRelationObject('Family', 'owner', {
  description: undefined,
  nullable: false,
  args: undefined,
  query: undefined,
});

export const FamilyMembersFieldArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.GuestWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.GuestOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.GuestWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.GuestScalarFieldEnum], required: false }),
}))

export const FamilyMembersFieldObject = defineRelationFunction('Family', (t) =>
  defineRelationObject('Family', 'members', {
    description: undefined,
    nullable: false,
    args: FamilyMembersFieldArgs,
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

export const FamilyCreatedAtFieldObject = defineFieldObject('Family', {
  type: Inputs.DateTime,
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.createdAt,
});

export const FamilyUpdatedAtFieldObject = defineFieldObject('Family', {
  type: Inputs.DateTime,
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.updatedAt,
});
