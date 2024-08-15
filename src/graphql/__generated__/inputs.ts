// @ts-nocheck
import { Prisma } from '.prisma/client';

import { builder } from '../builder';

type Filters = {
  string: Prisma.StringFieldUpdateOperationsInput;
  nullableString: Prisma.NullableStringFieldUpdateOperationsInput;
  dateTime: Prisma.DateTimeFieldUpdateOperationsInput;
  nullableDateTime: Prisma.NullableDateTimeFieldUpdateOperationsInput;
  int: Prisma.IntFieldUpdateOperationsInput;
  nullableInt: Prisma.NullableIntFieldUpdateOperationsInput;
  bool: Prisma.BoolFieldUpdateOperationsInput;
  nullableBool: Prisma.NullableBoolFieldUpdateOperationsInput;
  bigInt: Prisma.BigIntFieldUpdateOperationsInput;
  nullableBigInt: Prisma.NullableBigIntFieldUpdateOperationsInput;
  bytes: Prisma.BytesFieldUpdateOperationsInput;
  nullableBytes: Prisma.NullableBytesFieldUpdateOperationsInput;
  float: Prisma.FloatFieldUpdateOperationsInput;
  nullableFloat: Prisma.NullableFloatFieldUpdateOperationsInput;
  decimal: Prisma.DecimalFieldUpdateOperationsInput;
  nullableDecimal: Prisma.NullableDecimalFieldUpdateOperationsInput;
};

type ApplyFilters<InputField> = {
  [F in keyof Filters]: 0 extends 1 & Filters[F]
    ? never
    : Filters[F] extends InputField
    ? Filters[F]
    : never;
}[keyof Filters];

type PrismaUpdateOperationsInputFilter<T extends object> = {
  [K in keyof T]: [ApplyFilters<T[K]>] extends [never] ? T[K] : ApplyFilters<T[K]>
};

export const DateTime = builder.scalarType('DateTime', {
  parseValue: (value) => {
    try {
      const date = new Date(value)
      if (date.toString() === 'Invalid Date') throw new Error('Invalid Date')
      return date
    } catch (error) {
      throw new Error('Invalid Date');
    }
  },
  serialize: (value) => value ? new Date(value) : null,
});

export const TransactionIsolationLevel = builder.enumType('TransactionIsolationLevel', {
  values: ["ReadUncommitted","ReadCommitted","RepeatableRead","Serializable"] as const,
});

export const FamilyScalarFieldEnum = builder.enumType('FamilyScalarFieldEnum', {
  values: ["id","ownerId","name","createdAt","updatedAt"] as const,
});

export const GuestScalarFieldEnum = builder.enumType('GuestScalarFieldEnum', {
  values: ["id","familyId","status","password","email","first_name","last_name","side","type","age","sex","table","transfer","accommodation","createdAt","updatedAt"] as const,
});

export const EventScalarFieldEnum = builder.enumType('EventScalarFieldEnum', {
  values: ["id","index","alias","name","date","start","end","description","address","url","createdAt","updatedAt"] as const,
});

export const SortOrder = builder.enumType('SortOrder', {
  values: ["asc","desc"] as const,
});

export const QueryMode = builder.enumType('QueryMode', {
  values: ["default","insensitive"] as const,
});

export const NullsOrder = builder.enumType('NullsOrder', {
  values: ["first","last"] as const,
});

export const Sex = builder.enumType('Sex', {
  values: ["MALE","FEMALE"] as const,
});

export const Age = builder.enumType('Age', {
  values: ["ADULT","CHILD"] as const,
});

export const Status = builder.enumType('Status', {
  values: ["PENDING","APPROVED","ADMIN"] as const,
});

export const Side = builder.enumType('Side', {
  values: ["GROOM","BRIDE"] as const,
});

export const Type = builder.enumType('Type', {
  values: ["COLLEAGUE","FRIEND","BEST_FRIEND","RELATIVE","CLOSE_RELATIVE","PARENT"] as const,
});

export const FamilyWhereInputFields = (t: any) => ({
  AND: t.field({"required":false,"type":[FamilyWhereInput]}),
  OR: t.field({"required":false,"type":[FamilyWhereInput]}),
  NOT: t.field({"required":false,"type":[FamilyWhereInput]}),
  id: t.field({"required":false,"type":UuidFilter}),
  ownerId: t.field({"required":false,"type":UuidFilter}),
  name: t.field({"required":false,"type":StringFilter}),
  createdAt: t.field({"required":false,"type":DateTimeFilter}),
  updatedAt: t.field({"required":false,"type":DateTimeFilter}),
  owner: t.field({"required":false,"type":GuestWhereInput}),
  members: t.field({"required":false,"type":GuestListRelationFilter}),
});
export const FamilyWhereInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.FamilyWhereInput>, false>('FamilyWhereInput').implement({
  fields: FamilyWhereInputFields,
});

export const FamilyOrderByWithRelationInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
  ownerId: t.field({"required":false,"type":SortOrder}),
  name: t.field({"required":false,"type":SortOrder}),
  createdAt: t.field({"required":false,"type":SortOrder}),
  updatedAt: t.field({"required":false,"type":SortOrder}),
  owner: t.field({"required":false,"type":GuestOrderByWithRelationInput}),
  members: t.field({"required":false,"type":GuestOrderByRelationAggregateInput}),
});
export const FamilyOrderByWithRelationInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.FamilyOrderByWithRelationInput>, false>('FamilyOrderByWithRelationInput').implement({
  fields: FamilyOrderByWithRelationInputFields,
});

export const FamilyWhereUniqueInputFields = (t: any) => ({
  id: t.id({"required":false}),
  ownerId: t.string({"required":false}),
  AND: t.field({"required":false,"type":[FamilyWhereInput]}),
  OR: t.field({"required":false,"type":[FamilyWhereInput]}),
  NOT: t.field({"required":false,"type":[FamilyWhereInput]}),
  name: t.field({"required":false,"type":StringFilter}),
  createdAt: t.field({"required":false,"type":DateTimeFilter}),
  updatedAt: t.field({"required":false,"type":DateTimeFilter}),
  owner: t.field({"required":false,"type":GuestWhereInput}),
  members: t.field({"required":false,"type":GuestListRelationFilter}),
});
export const FamilyWhereUniqueInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.FamilyWhereUniqueInput>, false>('FamilyWhereUniqueInput').implement({
  fields: FamilyWhereUniqueInputFields,
});

export const FamilyOrderByWithAggregationInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
  ownerId: t.field({"required":false,"type":SortOrder}),
  name: t.field({"required":false,"type":SortOrder}),
  createdAt: t.field({"required":false,"type":SortOrder}),
  updatedAt: t.field({"required":false,"type":SortOrder}),
  _count: t.field({"required":false,"type":FamilyCountOrderByAggregateInput}),
  _max: t.field({"required":false,"type":FamilyMaxOrderByAggregateInput}),
  _min: t.field({"required":false,"type":FamilyMinOrderByAggregateInput}),
});
export const FamilyOrderByWithAggregationInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.FamilyOrderByWithAggregationInput>, false>('FamilyOrderByWithAggregationInput').implement({
  fields: FamilyOrderByWithAggregationInputFields,
});

export const FamilyScalarWhereWithAggregatesInputFields = (t: any) => ({
  AND: t.field({"required":false,"type":[FamilyScalarWhereWithAggregatesInput]}),
  OR: t.field({"required":false,"type":[FamilyScalarWhereWithAggregatesInput]}),
  NOT: t.field({"required":false,"type":[FamilyScalarWhereWithAggregatesInput]}),
  id: t.field({"required":false,"type":UuidWithAggregatesFilter}),
  ownerId: t.field({"required":false,"type":UuidWithAggregatesFilter}),
  name: t.field({"required":false,"type":StringWithAggregatesFilter}),
  createdAt: t.field({"required":false,"type":DateTimeWithAggregatesFilter}),
  updatedAt: t.field({"required":false,"type":DateTimeWithAggregatesFilter}),
});
export const FamilyScalarWhereWithAggregatesInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.FamilyScalarWhereWithAggregatesInput>, false>('FamilyScalarWhereWithAggregatesInput').implement({
  fields: FamilyScalarWhereWithAggregatesInputFields,
});

export const GuestWhereInputFields = (t: any) => ({
  AND: t.field({"required":false,"type":[GuestWhereInput]}),
  OR: t.field({"required":false,"type":[GuestWhereInput]}),
  NOT: t.field({"required":false,"type":[GuestWhereInput]}),
  id: t.field({"required":false,"type":UuidFilter}),
  familyId: t.field({"required":false,"type":UuidNullableFilter}),
  status: t.field({"required":false,"type":EnumStatusFilter}),
  email: t.field({"required":false,"type":StringFilter}),
  first_name: t.field({"required":false,"type":StringFilter}),
  last_name: t.field({"required":false,"type":StringNullableFilter}),
  side: t.field({"required":false,"type":EnumSideFilter}),
  type: t.field({"required":false,"type":EnumTypeFilter}),
  age: t.field({"required":false,"type":EnumAgeFilter}),
  sex: t.field({"required":false,"type":EnumSexFilter}),
  table: t.field({"required":false,"type":IntNullableFilter}),
  transfer: t.field({"required":false,"type":BoolFilter}),
  accommodation: t.field({"required":false,"type":BoolFilter}),
  createdAt: t.field({"required":false,"type":DateTimeFilter}),
  updatedAt: t.field({"required":false,"type":DateTimeFilter}),
  family: t.field({"required":false,"type":FamilyWhereInput}),
  ownedFamily: t.field({"required":false,"type":FamilyWhereInput}),
  events: t.field({"required":false,"type":EventListRelationFilter}),
  // 'password' was omitted due to @Pothos.omit found in schema comment
});
export const GuestWhereInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.GuestWhereInput>, false>('GuestWhereInput').implement({
  fields: GuestWhereInputFields,
});

export const GuestOrderByWithRelationInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
  familyId: t.field({"required":false,"type":SortOrder}),
  status: t.field({"required":false,"type":SortOrder}),
  email: t.field({"required":false,"type":SortOrder}),
  first_name: t.field({"required":false,"type":SortOrder}),
  last_name: t.field({"required":false,"type":SortOrder}),
  side: t.field({"required":false,"type":SortOrder}),
  type: t.field({"required":false,"type":SortOrder}),
  age: t.field({"required":false,"type":SortOrder}),
  sex: t.field({"required":false,"type":SortOrder}),
  table: t.field({"required":false,"type":SortOrder}),
  transfer: t.field({"required":false,"type":SortOrder}),
  accommodation: t.field({"required":false,"type":SortOrder}),
  createdAt: t.field({"required":false,"type":SortOrder}),
  updatedAt: t.field({"required":false,"type":SortOrder}),
  family: t.field({"required":false,"type":FamilyOrderByWithRelationInput}),
  ownedFamily: t.field({"required":false,"type":FamilyOrderByWithRelationInput}),
  events: t.field({"required":false,"type":EventOrderByRelationAggregateInput}),
  // 'password' was omitted due to @Pothos.omit found in schema comment
});
export const GuestOrderByWithRelationInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.GuestOrderByWithRelationInput>, false>('GuestOrderByWithRelationInput').implement({
  fields: GuestOrderByWithRelationInputFields,
});

export const GuestWhereUniqueInputFields = (t: any) => ({
  id: t.id({"required":false}),
  email: t.string({"required":false}),
  AND: t.field({"required":false,"type":[GuestWhereInput]}),
  OR: t.field({"required":false,"type":[GuestWhereInput]}),
  NOT: t.field({"required":false,"type":[GuestWhereInput]}),
  familyId: t.field({"required":false,"type":UuidNullableFilter}),
  status: t.field({"required":false,"type":EnumStatusFilter}),
  first_name: t.field({"required":false,"type":StringFilter}),
  last_name: t.field({"required":false,"type":StringNullableFilter}),
  side: t.field({"required":false,"type":EnumSideFilter}),
  type: t.field({"required":false,"type":EnumTypeFilter}),
  age: t.field({"required":false,"type":EnumAgeFilter}),
  sex: t.field({"required":false,"type":EnumSexFilter}),
  table: t.field({"required":false,"type":IntNullableFilter}),
  transfer: t.field({"required":false,"type":BoolFilter}),
  accommodation: t.field({"required":false,"type":BoolFilter}),
  createdAt: t.field({"required":false,"type":DateTimeFilter}),
  updatedAt: t.field({"required":false,"type":DateTimeFilter}),
  family: t.field({"required":false,"type":FamilyWhereInput}),
  ownedFamily: t.field({"required":false,"type":FamilyWhereInput}),
  events: t.field({"required":false,"type":EventListRelationFilter}),
  // 'password' was omitted due to @Pothos.omit found in schema comment
});
export const GuestWhereUniqueInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.GuestWhereUniqueInput>, false>('GuestWhereUniqueInput').implement({
  fields: GuestWhereUniqueInputFields,
});

export const GuestOrderByWithAggregationInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
  familyId: t.field({"required":false,"type":SortOrder}),
  status: t.field({"required":false,"type":SortOrder}),
  email: t.field({"required":false,"type":SortOrder}),
  first_name: t.field({"required":false,"type":SortOrder}),
  last_name: t.field({"required":false,"type":SortOrder}),
  side: t.field({"required":false,"type":SortOrder}),
  type: t.field({"required":false,"type":SortOrder}),
  age: t.field({"required":false,"type":SortOrder}),
  sex: t.field({"required":false,"type":SortOrder}),
  table: t.field({"required":false,"type":SortOrder}),
  transfer: t.field({"required":false,"type":SortOrder}),
  accommodation: t.field({"required":false,"type":SortOrder}),
  createdAt: t.field({"required":false,"type":SortOrder}),
  updatedAt: t.field({"required":false,"type":SortOrder}),
  _count: t.field({"required":false,"type":GuestCountOrderByAggregateInput}),
  _avg: t.field({"required":false,"type":GuestAvgOrderByAggregateInput}),
  _max: t.field({"required":false,"type":GuestMaxOrderByAggregateInput}),
  _min: t.field({"required":false,"type":GuestMinOrderByAggregateInput}),
  _sum: t.field({"required":false,"type":GuestSumOrderByAggregateInput}),
  // 'password' was omitted due to @Pothos.omit found in schema comment
});
export const GuestOrderByWithAggregationInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.GuestOrderByWithAggregationInput>, false>('GuestOrderByWithAggregationInput').implement({
  fields: GuestOrderByWithAggregationInputFields,
});

export const GuestScalarWhereWithAggregatesInputFields = (t: any) => ({
  AND: t.field({"required":false,"type":[GuestScalarWhereWithAggregatesInput]}),
  OR: t.field({"required":false,"type":[GuestScalarWhereWithAggregatesInput]}),
  NOT: t.field({"required":false,"type":[GuestScalarWhereWithAggregatesInput]}),
  id: t.field({"required":false,"type":UuidWithAggregatesFilter}),
  familyId: t.field({"required":false,"type":UuidNullableWithAggregatesFilter}),
  status: t.field({"required":false,"type":EnumStatusWithAggregatesFilter}),
  email: t.field({"required":false,"type":StringWithAggregatesFilter}),
  first_name: t.field({"required":false,"type":StringWithAggregatesFilter}),
  last_name: t.field({"required":false,"type":StringNullableWithAggregatesFilter}),
  side: t.field({"required":false,"type":EnumSideWithAggregatesFilter}),
  type: t.field({"required":false,"type":EnumTypeWithAggregatesFilter}),
  age: t.field({"required":false,"type":EnumAgeWithAggregatesFilter}),
  sex: t.field({"required":false,"type":EnumSexWithAggregatesFilter}),
  table: t.field({"required":false,"type":IntNullableWithAggregatesFilter}),
  transfer: t.field({"required":false,"type":BoolWithAggregatesFilter}),
  accommodation: t.field({"required":false,"type":BoolWithAggregatesFilter}),
  createdAt: t.field({"required":false,"type":DateTimeWithAggregatesFilter}),
  updatedAt: t.field({"required":false,"type":DateTimeWithAggregatesFilter}),
  // 'password' was omitted due to @Pothos.omit found in schema comment
});
export const GuestScalarWhereWithAggregatesInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.GuestScalarWhereWithAggregatesInput>, false>('GuestScalarWhereWithAggregatesInput').implement({
  fields: GuestScalarWhereWithAggregatesInputFields,
});

export const EventWhereInputFields = (t: any) => ({
  AND: t.field({"required":false,"type":[EventWhereInput]}),
  OR: t.field({"required":false,"type":[EventWhereInput]}),
  NOT: t.field({"required":false,"type":[EventWhereInput]}),
  id: t.field({"required":false,"type":UuidFilter}),
  index: t.field({"required":false,"type":IntFilter}),
  alias: t.field({"required":false,"type":StringFilter}),
  name: t.field({"required":false,"type":StringFilter}),
  date: t.field({"required":false,"type":DateTimeFilter}),
  start: t.field({"required":false,"type":DateTimeFilter}),
  end: t.field({"required":false,"type":DateTimeFilter}),
  description: t.field({"required":false,"type":StringFilter}),
  address: t.field({"required":false,"type":StringNullableFilter}),
  url: t.field({"required":false,"type":StringNullableFilter}),
  createdAt: t.field({"required":false,"type":DateTimeFilter}),
  updatedAt: t.field({"required":false,"type":DateTimeFilter}),
  guests: t.field({"required":false,"type":GuestListRelationFilter}),
});
export const EventWhereInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.EventWhereInput>, false>('EventWhereInput').implement({
  fields: EventWhereInputFields,
});

export const EventOrderByWithRelationInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
  index: t.field({"required":false,"type":SortOrder}),
  alias: t.field({"required":false,"type":SortOrder}),
  name: t.field({"required":false,"type":SortOrder}),
  date: t.field({"required":false,"type":SortOrder}),
  start: t.field({"required":false,"type":SortOrder}),
  end: t.field({"required":false,"type":SortOrder}),
  description: t.field({"required":false,"type":SortOrder}),
  address: t.field({"required":false,"type":SortOrder}),
  url: t.field({"required":false,"type":SortOrder}),
  createdAt: t.field({"required":false,"type":SortOrder}),
  updatedAt: t.field({"required":false,"type":SortOrder}),
  guests: t.field({"required":false,"type":GuestOrderByRelationAggregateInput}),
});
export const EventOrderByWithRelationInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.EventOrderByWithRelationInput>, false>('EventOrderByWithRelationInput').implement({
  fields: EventOrderByWithRelationInputFields,
});

export const EventWhereUniqueInputFields = (t: any) => ({
  id: t.id({"required":false}),
  index: t.int({"required":false}),
  alias: t.string({"required":false}),
  AND: t.field({"required":false,"type":[EventWhereInput]}),
  OR: t.field({"required":false,"type":[EventWhereInput]}),
  NOT: t.field({"required":false,"type":[EventWhereInput]}),
  name: t.field({"required":false,"type":StringFilter}),
  date: t.field({"required":false,"type":DateTimeFilter}),
  start: t.field({"required":false,"type":DateTimeFilter}),
  end: t.field({"required":false,"type":DateTimeFilter}),
  description: t.field({"required":false,"type":StringFilter}),
  address: t.field({"required":false,"type":StringNullableFilter}),
  url: t.field({"required":false,"type":StringNullableFilter}),
  createdAt: t.field({"required":false,"type":DateTimeFilter}),
  updatedAt: t.field({"required":false,"type":DateTimeFilter}),
  guests: t.field({"required":false,"type":GuestListRelationFilter}),
});
export const EventWhereUniqueInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.EventWhereUniqueInput>, false>('EventWhereUniqueInput').implement({
  fields: EventWhereUniqueInputFields,
});

export const EventOrderByWithAggregationInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
  index: t.field({"required":false,"type":SortOrder}),
  alias: t.field({"required":false,"type":SortOrder}),
  name: t.field({"required":false,"type":SortOrder}),
  date: t.field({"required":false,"type":SortOrder}),
  start: t.field({"required":false,"type":SortOrder}),
  end: t.field({"required":false,"type":SortOrder}),
  description: t.field({"required":false,"type":SortOrder}),
  address: t.field({"required":false,"type":SortOrder}),
  url: t.field({"required":false,"type":SortOrder}),
  createdAt: t.field({"required":false,"type":SortOrder}),
  updatedAt: t.field({"required":false,"type":SortOrder}),
  _count: t.field({"required":false,"type":EventCountOrderByAggregateInput}),
  _avg: t.field({"required":false,"type":EventAvgOrderByAggregateInput}),
  _max: t.field({"required":false,"type":EventMaxOrderByAggregateInput}),
  _min: t.field({"required":false,"type":EventMinOrderByAggregateInput}),
  _sum: t.field({"required":false,"type":EventSumOrderByAggregateInput}),
});
export const EventOrderByWithAggregationInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.EventOrderByWithAggregationInput>, false>('EventOrderByWithAggregationInput').implement({
  fields: EventOrderByWithAggregationInputFields,
});

export const EventScalarWhereWithAggregatesInputFields = (t: any) => ({
  AND: t.field({"required":false,"type":[EventScalarWhereWithAggregatesInput]}),
  OR: t.field({"required":false,"type":[EventScalarWhereWithAggregatesInput]}),
  NOT: t.field({"required":false,"type":[EventScalarWhereWithAggregatesInput]}),
  id: t.field({"required":false,"type":UuidWithAggregatesFilter}),
  index: t.field({"required":false,"type":IntWithAggregatesFilter}),
  alias: t.field({"required":false,"type":StringWithAggregatesFilter}),
  name: t.field({"required":false,"type":StringWithAggregatesFilter}),
  date: t.field({"required":false,"type":DateTimeWithAggregatesFilter}),
  start: t.field({"required":false,"type":DateTimeWithAggregatesFilter}),
  end: t.field({"required":false,"type":DateTimeWithAggregatesFilter}),
  description: t.field({"required":false,"type":StringWithAggregatesFilter}),
  address: t.field({"required":false,"type":StringNullableWithAggregatesFilter}),
  url: t.field({"required":false,"type":StringNullableWithAggregatesFilter}),
  createdAt: t.field({"required":false,"type":DateTimeWithAggregatesFilter}),
  updatedAt: t.field({"required":false,"type":DateTimeWithAggregatesFilter}),
});
export const EventScalarWhereWithAggregatesInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.EventScalarWhereWithAggregatesInput>, false>('EventScalarWhereWithAggregatesInput').implement({
  fields: EventScalarWhereWithAggregatesInputFields,
});

export const FamilyCreateInputFields = (t: any) => ({
  name: t.string({"required":true}),
  owner: t.field({"required":true,"type":GuestCreateNestedOneWithoutOwnedFamilyInput}),
  members: t.field({"required":false,"type":GuestCreateNestedManyWithoutFamilyInput}),
  // 'id' was omitted due to @Pothos.omit found in schema comment
  // 'createdAt' was omitted due to @Pothos.omit found in schema comment
  // 'updatedAt' was omitted due to @Pothos.omit found in schema comment
});
export const FamilyCreateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.FamilyCreateInput>, false>('FamilyCreateInput').implement({
  fields: FamilyCreateInputFields,
});

export const FamilyUpdateInputFields = (t: any) => ({
  name: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  owner: t.field({"required":false,"type":GuestUpdateOneRequiredWithoutOwnedFamilyNestedInput}),
  members: t.field({"required":false,"type":GuestUpdateManyWithoutFamilyNestedInput}),
  // 'id' was omitted due to @Pothos.omit found in schema comment
  // 'createdAt' was omitted due to @Pothos.omit found in schema comment
  // 'updatedAt' was omitted due to @Pothos.omit found in schema comment
});
export const FamilyUpdateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.FamilyUpdateInput>, false>('FamilyUpdateInput').implement({
  fields: FamilyUpdateInputFields,
});

export const FamilyCreateManyInputFields = (t: any) => ({
  ownerId: t.string({"required":true}),
  name: t.string({"required":true}),
  // 'id' was omitted due to @Pothos.omit found in schema comment
  // 'createdAt' was omitted due to @Pothos.omit found in schema comment
  // 'updatedAt' was omitted due to @Pothos.omit found in schema comment
});
export const FamilyCreateManyInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.FamilyCreateManyInput>, false>('FamilyCreateManyInput').implement({
  fields: FamilyCreateManyInputFields,
});

export const FamilyUpdateManyMutationInputFields = (t: any) => ({
  name: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  // 'id' was omitted due to @Pothos.omit found in schema comment
  // 'createdAt' was omitted due to @Pothos.omit found in schema comment
  // 'updatedAt' was omitted due to @Pothos.omit found in schema comment
});
export const FamilyUpdateManyMutationInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.FamilyUpdateManyMutationInput>, false>('FamilyUpdateManyMutationInput').implement({
  fields: FamilyUpdateManyMutationInputFields,
});

export const GuestCreateInputFields = (t: any) => ({
  status: t.field({"required":false,"type":Status}),
  email: t.string({"required":true}),
  first_name: t.string({"required":true}),
  last_name: t.string({"required":false}),
  side: t.field({"required":true,"type":Side}),
  type: t.field({"required":false,"type":Type}),
  age: t.field({"required":false,"type":Age}),
  sex: t.field({"required":true,"type":Sex}),
  table: t.int({"required":false}),
  transfer: t.boolean({"required":false}),
  accommodation: t.boolean({"required":false}),
  family: t.field({"required":false,"type":FamilyCreateNestedOneWithoutMembersInput}),
  // 'id' was omitted due to @Pothos.omit found in schema comment
  // 'password' was omitted due to @Pothos.omit found in schema comment
  // 'createdAt' was omitted due to @Pothos.omit found in schema comment
  // 'updatedAt' was omitted due to @Pothos.omit found in schema comment
  // 'ownedFamily' was omitted due to @Pothos.omit found in schema comment
  // 'events' was omitted due to @Pothos.omit found in schema comment
});
export const GuestCreateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.GuestCreateInput>, false>('GuestCreateInput').implement({
  fields: GuestCreateInputFields,
});

export const GuestUpdateInputFields = (t: any) => ({
  status: t.field({"required":false,"type":EnumStatusFieldUpdateOperationsInput}),
  email: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  first_name: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  last_name: t.field({"required":false,"type":NullableStringFieldUpdateOperationsInput}),
  side: t.field({"required":false,"type":EnumSideFieldUpdateOperationsInput}),
  type: t.field({"required":false,"type":EnumTypeFieldUpdateOperationsInput}),
  age: t.field({"required":false,"type":EnumAgeFieldUpdateOperationsInput}),
  sex: t.field({"required":false,"type":EnumSexFieldUpdateOperationsInput}),
  table: t.field({"required":false,"type":NullableIntFieldUpdateOperationsInput}),
  transfer: t.field({"required":false,"type":BoolFieldUpdateOperationsInput}),
  accommodation: t.field({"required":false,"type":BoolFieldUpdateOperationsInput}),
  family: t.field({"required":false,"type":FamilyUpdateOneWithoutMembersNestedInput}),
  ownedFamily: t.field({"required":false,"type":FamilyUpdateOneWithoutOwnerNestedInput}),
  events: t.field({"required":false,"type":EventUpdateManyWithoutGuestsNestedInput}),
  // 'id' was omitted due to @Pothos.omit found in schema comment
  // 'password' was omitted due to @Pothos.omit found in schema comment
  // 'createdAt' was omitted due to @Pothos.omit found in schema comment
  // 'updatedAt' was omitted due to @Pothos.omit found in schema comment
});
export const GuestUpdateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.GuestUpdateInput>, false>('GuestUpdateInput').implement({
  fields: GuestUpdateInputFields,
});

export const GuestCreateManyInputFields = (t: any) => ({
  familyId: t.string({"required":false}),
  status: t.field({"required":false,"type":Status}),
  email: t.string({"required":true}),
  first_name: t.string({"required":true}),
  last_name: t.string({"required":false}),
  side: t.field({"required":true,"type":Side}),
  type: t.field({"required":false,"type":Type}),
  age: t.field({"required":false,"type":Age}),
  sex: t.field({"required":true,"type":Sex}),
  table: t.int({"required":false}),
  transfer: t.boolean({"required":false}),
  accommodation: t.boolean({"required":false}),
  // 'id' was omitted due to @Pothos.omit found in schema comment
  // 'password' was omitted due to @Pothos.omit found in schema comment
  // 'createdAt' was omitted due to @Pothos.omit found in schema comment
  // 'updatedAt' was omitted due to @Pothos.omit found in schema comment
});
export const GuestCreateManyInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.GuestCreateManyInput>, false>('GuestCreateManyInput').implement({
  fields: GuestCreateManyInputFields,
});

export const GuestUpdateManyMutationInputFields = (t: any) => ({
  status: t.field({"required":false,"type":EnumStatusFieldUpdateOperationsInput}),
  email: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  first_name: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  last_name: t.field({"required":false,"type":NullableStringFieldUpdateOperationsInput}),
  side: t.field({"required":false,"type":EnumSideFieldUpdateOperationsInput}),
  type: t.field({"required":false,"type":EnumTypeFieldUpdateOperationsInput}),
  age: t.field({"required":false,"type":EnumAgeFieldUpdateOperationsInput}),
  sex: t.field({"required":false,"type":EnumSexFieldUpdateOperationsInput}),
  table: t.field({"required":false,"type":NullableIntFieldUpdateOperationsInput}),
  transfer: t.field({"required":false,"type":BoolFieldUpdateOperationsInput}),
  accommodation: t.field({"required":false,"type":BoolFieldUpdateOperationsInput}),
  // 'id' was omitted due to @Pothos.omit found in schema comment
  // 'password' was omitted due to @Pothos.omit found in schema comment
  // 'createdAt' was omitted due to @Pothos.omit found in schema comment
  // 'updatedAt' was omitted due to @Pothos.omit found in schema comment
});
export const GuestUpdateManyMutationInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.GuestUpdateManyMutationInput>, false>('GuestUpdateManyMutationInput').implement({
  fields: GuestUpdateManyMutationInputFields,
});

export const EventCreateInputFields = (t: any) => ({
  index: t.int({"required":true}),
  alias: t.string({"required":true}),
  name: t.string({"required":true}),
  date: t.field({"required":true,"type":DateTime}),
  start: t.field({"required":true,"type":DateTime}),
  end: t.field({"required":true,"type":DateTime}),
  description: t.string({"required":true}),
  address: t.string({"required":false}),
  url: t.string({"required":false}),
  guests: t.field({"required":false,"type":GuestCreateNestedManyWithoutEventsInput}),
  // 'id' was omitted due to @Pothos.omit found in schema comment
  // 'createdAt' was omitted due to @Pothos.omit found in schema comment
  // 'updatedAt' was omitted due to @Pothos.omit found in schema comment
});
export const EventCreateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.EventCreateInput>, false>('EventCreateInput').implement({
  fields: EventCreateInputFields,
});

export const EventUpdateInputFields = (t: any) => ({
  index: t.field({"required":false,"type":IntFieldUpdateOperationsInput}),
  alias: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  name: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  date: t.field({"required":false,"type":DateTimeFieldUpdateOperationsInput}),
  start: t.field({"required":false,"type":DateTimeFieldUpdateOperationsInput}),
  end: t.field({"required":false,"type":DateTimeFieldUpdateOperationsInput}),
  description: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  address: t.field({"required":false,"type":NullableStringFieldUpdateOperationsInput}),
  url: t.field({"required":false,"type":NullableStringFieldUpdateOperationsInput}),
  guests: t.field({"required":false,"type":GuestUpdateManyWithoutEventsNestedInput}),
  // 'id' was omitted due to @Pothos.omit found in schema comment
  // 'createdAt' was omitted due to @Pothos.omit found in schema comment
  // 'updatedAt' was omitted due to @Pothos.omit found in schema comment
});
export const EventUpdateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.EventUpdateInput>, false>('EventUpdateInput').implement({
  fields: EventUpdateInputFields,
});

export const EventCreateManyInputFields = (t: any) => ({
  index: t.int({"required":true}),
  alias: t.string({"required":true}),
  name: t.string({"required":true}),
  date: t.field({"required":true,"type":DateTime}),
  start: t.field({"required":true,"type":DateTime}),
  end: t.field({"required":true,"type":DateTime}),
  description: t.string({"required":true}),
  address: t.string({"required":false}),
  url: t.string({"required":false}),
  // 'id' was omitted due to @Pothos.omit found in schema comment
  // 'createdAt' was omitted due to @Pothos.omit found in schema comment
  // 'updatedAt' was omitted due to @Pothos.omit found in schema comment
});
export const EventCreateManyInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.EventCreateManyInput>, false>('EventCreateManyInput').implement({
  fields: EventCreateManyInputFields,
});

export const EventUpdateManyMutationInputFields = (t: any) => ({
  index: t.field({"required":false,"type":IntFieldUpdateOperationsInput}),
  alias: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  name: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  date: t.field({"required":false,"type":DateTimeFieldUpdateOperationsInput}),
  start: t.field({"required":false,"type":DateTimeFieldUpdateOperationsInput}),
  end: t.field({"required":false,"type":DateTimeFieldUpdateOperationsInput}),
  description: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  address: t.field({"required":false,"type":NullableStringFieldUpdateOperationsInput}),
  url: t.field({"required":false,"type":NullableStringFieldUpdateOperationsInput}),
  // 'id' was omitted due to @Pothos.omit found in schema comment
  // 'createdAt' was omitted due to @Pothos.omit found in schema comment
  // 'updatedAt' was omitted due to @Pothos.omit found in schema comment
});
export const EventUpdateManyMutationInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.EventUpdateManyMutationInput>, false>('EventUpdateManyMutationInput').implement({
  fields: EventUpdateManyMutationInputFields,
});

export const UuidFilterFields = (t: any) => ({
  equals: t.string({"required":false}),
  in: t.stringList({"required":false}),
  notIn: t.stringList({"required":false}),
  lt: t.string({"required":false}),
  lte: t.string({"required":false}),
  gt: t.string({"required":false}),
  gte: t.string({"required":false}),
  mode: t.field({"required":false,"type":QueryMode}),
  not: t.field({"required":false,"type":NestedUuidFilter}),
});
export const UuidFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UuidFilter>, false>('UuidFilter').implement({
  fields: UuidFilterFields,
});

export const StringFilterFields = (t: any) => ({
  equals: t.string({"required":false}),
  in: t.stringList({"required":false}),
  notIn: t.stringList({"required":false}),
  lt: t.string({"required":false}),
  lte: t.string({"required":false}),
  gt: t.string({"required":false}),
  gte: t.string({"required":false}),
  contains: t.string({"required":false}),
  startsWith: t.string({"required":false}),
  endsWith: t.string({"required":false}),
  mode: t.field({"required":false,"type":QueryMode}),
  not: t.field({"required":false,"type":NestedStringFilter}),
});
export const StringFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.StringFilter>, false>('StringFilter').implement({
  fields: StringFilterFields,
});

export const DateTimeFilterFields = (t: any) => ({
  equals: t.field({"required":false,"type":DateTime}),
  in: t.field({"required":false,"type":[DateTime]}),
  notIn: t.field({"required":false,"type":[DateTime]}),
  lt: t.field({"required":false,"type":DateTime}),
  lte: t.field({"required":false,"type":DateTime}),
  gt: t.field({"required":false,"type":DateTime}),
  gte: t.field({"required":false,"type":DateTime}),
  not: t.field({"required":false,"type":NestedDateTimeFilter}),
});
export const DateTimeFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.DateTimeFilter>, false>('DateTimeFilter').implement({
  fields: DateTimeFilterFields,
});

export const GuestRelationFilterFields = (t: any) => ({
  is: t.field({"required":false,"type":GuestWhereInput}),
  isNot: t.field({"required":false,"type":GuestWhereInput}),
});
export const GuestRelationFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.GuestRelationFilter>, false>('GuestRelationFilter').implement({
  fields: GuestRelationFilterFields,
});

export const GuestListRelationFilterFields = (t: any) => ({
  every: t.field({"required":false,"type":GuestWhereInput}),
  some: t.field({"required":false,"type":GuestWhereInput}),
  none: t.field({"required":false,"type":GuestWhereInput}),
});
export const GuestListRelationFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.GuestListRelationFilter>, false>('GuestListRelationFilter').implement({
  fields: GuestListRelationFilterFields,
});

export const GuestOrderByRelationAggregateInputFields = (t: any) => ({
  _count: t.field({"required":false,"type":SortOrder}),
});
export const GuestOrderByRelationAggregateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.GuestOrderByRelationAggregateInput>, false>('GuestOrderByRelationAggregateInput').implement({
  fields: GuestOrderByRelationAggregateInputFields,
});

export const FamilyCountOrderByAggregateInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
  ownerId: t.field({"required":false,"type":SortOrder}),
  name: t.field({"required":false,"type":SortOrder}),
  createdAt: t.field({"required":false,"type":SortOrder}),
  updatedAt: t.field({"required":false,"type":SortOrder}),
});
export const FamilyCountOrderByAggregateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.FamilyCountOrderByAggregateInput>, false>('FamilyCountOrderByAggregateInput').implement({
  fields: FamilyCountOrderByAggregateInputFields,
});

export const FamilyMaxOrderByAggregateInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
  ownerId: t.field({"required":false,"type":SortOrder}),
  name: t.field({"required":false,"type":SortOrder}),
  createdAt: t.field({"required":false,"type":SortOrder}),
  updatedAt: t.field({"required":false,"type":SortOrder}),
});
export const FamilyMaxOrderByAggregateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.FamilyMaxOrderByAggregateInput>, false>('FamilyMaxOrderByAggregateInput').implement({
  fields: FamilyMaxOrderByAggregateInputFields,
});

export const FamilyMinOrderByAggregateInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
  ownerId: t.field({"required":false,"type":SortOrder}),
  name: t.field({"required":false,"type":SortOrder}),
  createdAt: t.field({"required":false,"type":SortOrder}),
  updatedAt: t.field({"required":false,"type":SortOrder}),
});
export const FamilyMinOrderByAggregateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.FamilyMinOrderByAggregateInput>, false>('FamilyMinOrderByAggregateInput').implement({
  fields: FamilyMinOrderByAggregateInputFields,
});

export const UuidWithAggregatesFilterFields = (t: any) => ({
  equals: t.string({"required":false}),
  in: t.stringList({"required":false}),
  notIn: t.stringList({"required":false}),
  lt: t.string({"required":false}),
  lte: t.string({"required":false}),
  gt: t.string({"required":false}),
  gte: t.string({"required":false}),
  mode: t.field({"required":false,"type":QueryMode}),
  not: t.field({"required":false,"type":NestedUuidWithAggregatesFilter}),
  _count: t.field({"required":false,"type":NestedIntFilter}),
  _min: t.field({"required":false,"type":NestedStringFilter}),
  _max: t.field({"required":false,"type":NestedStringFilter}),
});
export const UuidWithAggregatesFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UuidWithAggregatesFilter>, false>('UuidWithAggregatesFilter').implement({
  fields: UuidWithAggregatesFilterFields,
});

export const StringWithAggregatesFilterFields = (t: any) => ({
  equals: t.string({"required":false}),
  in: t.stringList({"required":false}),
  notIn: t.stringList({"required":false}),
  lt: t.string({"required":false}),
  lte: t.string({"required":false}),
  gt: t.string({"required":false}),
  gte: t.string({"required":false}),
  contains: t.string({"required":false}),
  startsWith: t.string({"required":false}),
  endsWith: t.string({"required":false}),
  mode: t.field({"required":false,"type":QueryMode}),
  not: t.field({"required":false,"type":NestedStringWithAggregatesFilter}),
  _count: t.field({"required":false,"type":NestedIntFilter}),
  _min: t.field({"required":false,"type":NestedStringFilter}),
  _max: t.field({"required":false,"type":NestedStringFilter}),
});
export const StringWithAggregatesFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.StringWithAggregatesFilter>, false>('StringWithAggregatesFilter').implement({
  fields: StringWithAggregatesFilterFields,
});

export const DateTimeWithAggregatesFilterFields = (t: any) => ({
  equals: t.field({"required":false,"type":DateTime}),
  in: t.field({"required":false,"type":[DateTime]}),
  notIn: t.field({"required":false,"type":[DateTime]}),
  lt: t.field({"required":false,"type":DateTime}),
  lte: t.field({"required":false,"type":DateTime}),
  gt: t.field({"required":false,"type":DateTime}),
  gte: t.field({"required":false,"type":DateTime}),
  not: t.field({"required":false,"type":NestedDateTimeWithAggregatesFilter}),
  _count: t.field({"required":false,"type":NestedIntFilter}),
  _min: t.field({"required":false,"type":NestedDateTimeFilter}),
  _max: t.field({"required":false,"type":NestedDateTimeFilter}),
});
export const DateTimeWithAggregatesFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.DateTimeWithAggregatesFilter>, false>('DateTimeWithAggregatesFilter').implement({
  fields: DateTimeWithAggregatesFilterFields,
});

export const UuidNullableFilterFields = (t: any) => ({
  equals: t.string({"required":false}),
  in: t.stringList({"required":false}),
  notIn: t.stringList({"required":false}),
  lt: t.string({"required":false}),
  lte: t.string({"required":false}),
  gt: t.string({"required":false}),
  gte: t.string({"required":false}),
  mode: t.field({"required":false,"type":QueryMode}),
  not: t.field({"required":false,"type":NestedUuidNullableFilter}),
});
export const UuidNullableFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UuidNullableFilter>, false>('UuidNullableFilter').implement({
  fields: UuidNullableFilterFields,
});

export const EnumStatusFilterFields = (t: any) => ({
  equals: t.field({"required":false,"type":Status}),
  in: t.field({"required":false,"type":[Status]}),
  notIn: t.field({"required":false,"type":[Status]}),
  not: t.field({"required":false,"type":Status}),
});
export const EnumStatusFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.EnumStatusFilter>, false>('EnumStatusFilter').implement({
  fields: EnumStatusFilterFields,
});

export const StringNullableFilterFields = (t: any) => ({
  equals: t.string({"required":false}),
  in: t.stringList({"required":false}),
  notIn: t.stringList({"required":false}),
  lt: t.string({"required":false}),
  lte: t.string({"required":false}),
  gt: t.string({"required":false}),
  gte: t.string({"required":false}),
  contains: t.string({"required":false}),
  startsWith: t.string({"required":false}),
  endsWith: t.string({"required":false}),
  mode: t.field({"required":false,"type":QueryMode}),
  not: t.field({"required":false,"type":NestedStringNullableFilter}),
});
export const StringNullableFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.StringNullableFilter>, false>('StringNullableFilter').implement({
  fields: StringNullableFilterFields,
});

export const EnumSideFilterFields = (t: any) => ({
  equals: t.field({"required":false,"type":Side}),
  in: t.field({"required":false,"type":[Side]}),
  notIn: t.field({"required":false,"type":[Side]}),
  not: t.field({"required":false,"type":Side}),
});
export const EnumSideFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.EnumSideFilter>, false>('EnumSideFilter').implement({
  fields: EnumSideFilterFields,
});

export const EnumTypeFilterFields = (t: any) => ({
  equals: t.field({"required":false,"type":Type}),
  in: t.field({"required":false,"type":[Type]}),
  notIn: t.field({"required":false,"type":[Type]}),
  not: t.field({"required":false,"type":Type}),
});
export const EnumTypeFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.EnumTypeFilter>, false>('EnumTypeFilter').implement({
  fields: EnumTypeFilterFields,
});

export const EnumAgeFilterFields = (t: any) => ({
  equals: t.field({"required":false,"type":Age}),
  in: t.field({"required":false,"type":[Age]}),
  notIn: t.field({"required":false,"type":[Age]}),
  not: t.field({"required":false,"type":Age}),
});
export const EnumAgeFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.EnumAgeFilter>, false>('EnumAgeFilter').implement({
  fields: EnumAgeFilterFields,
});

export const EnumSexFilterFields = (t: any) => ({
  equals: t.field({"required":false,"type":Sex}),
  in: t.field({"required":false,"type":[Sex]}),
  notIn: t.field({"required":false,"type":[Sex]}),
  not: t.field({"required":false,"type":Sex}),
});
export const EnumSexFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.EnumSexFilter>, false>('EnumSexFilter').implement({
  fields: EnumSexFilterFields,
});

export const IntNullableFilterFields = (t: any) => ({
  equals: t.int({"required":false}),
  in: t.intList({"required":false}),
  notIn: t.intList({"required":false}),
  lt: t.int({"required":false}),
  lte: t.int({"required":false}),
  gt: t.int({"required":false}),
  gte: t.int({"required":false}),
  not: t.field({"required":false,"type":NestedIntNullableFilter}),
});
export const IntNullableFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.IntNullableFilter>, false>('IntNullableFilter').implement({
  fields: IntNullableFilterFields,
});

export const BoolFilterFields = (t: any) => ({
  equals: t.boolean({"required":false}),
  not: t.field({"required":false,"type":NestedBoolFilter}),
});
export const BoolFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.BoolFilter>, false>('BoolFilter').implement({
  fields: BoolFilterFields,
});

export const FamilyNullableRelationFilterFields = (t: any) => ({
  is: t.field({"required":false,"type":FamilyWhereInput}),
  isNot: t.field({"required":false,"type":FamilyWhereInput}),
});
export const FamilyNullableRelationFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.FamilyNullableRelationFilter>, false>('FamilyNullableRelationFilter').implement({
  fields: FamilyNullableRelationFilterFields,
});

export const EventListRelationFilterFields = (t: any) => ({
  every: t.field({"required":false,"type":EventWhereInput}),
  some: t.field({"required":false,"type":EventWhereInput}),
  none: t.field({"required":false,"type":EventWhereInput}),
});
export const EventListRelationFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.EventListRelationFilter>, false>('EventListRelationFilter').implement({
  fields: EventListRelationFilterFields,
});

export const EventOrderByRelationAggregateInputFields = (t: any) => ({
  _count: t.field({"required":false,"type":SortOrder}),
});
export const EventOrderByRelationAggregateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.EventOrderByRelationAggregateInput>, false>('EventOrderByRelationAggregateInput').implement({
  fields: EventOrderByRelationAggregateInputFields,
});

export const GuestCountOrderByAggregateInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
  familyId: t.field({"required":false,"type":SortOrder}),
  status: t.field({"required":false,"type":SortOrder}),
  email: t.field({"required":false,"type":SortOrder}),
  first_name: t.field({"required":false,"type":SortOrder}),
  last_name: t.field({"required":false,"type":SortOrder}),
  side: t.field({"required":false,"type":SortOrder}),
  type: t.field({"required":false,"type":SortOrder}),
  age: t.field({"required":false,"type":SortOrder}),
  sex: t.field({"required":false,"type":SortOrder}),
  table: t.field({"required":false,"type":SortOrder}),
  transfer: t.field({"required":false,"type":SortOrder}),
  accommodation: t.field({"required":false,"type":SortOrder}),
  createdAt: t.field({"required":false,"type":SortOrder}),
  updatedAt: t.field({"required":false,"type":SortOrder}),
  // 'password' was omitted due to @Pothos.omit found in schema comment
});
export const GuestCountOrderByAggregateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.GuestCountOrderByAggregateInput>, false>('GuestCountOrderByAggregateInput').implement({
  fields: GuestCountOrderByAggregateInputFields,
});

export const GuestAvgOrderByAggregateInputFields = (t: any) => ({
  table: t.field({"required":false,"type":SortOrder}),
});
export const GuestAvgOrderByAggregateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.GuestAvgOrderByAggregateInput>, false>('GuestAvgOrderByAggregateInput').implement({
  fields: GuestAvgOrderByAggregateInputFields,
});

export const GuestMaxOrderByAggregateInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
  familyId: t.field({"required":false,"type":SortOrder}),
  status: t.field({"required":false,"type":SortOrder}),
  email: t.field({"required":false,"type":SortOrder}),
  first_name: t.field({"required":false,"type":SortOrder}),
  last_name: t.field({"required":false,"type":SortOrder}),
  side: t.field({"required":false,"type":SortOrder}),
  type: t.field({"required":false,"type":SortOrder}),
  age: t.field({"required":false,"type":SortOrder}),
  sex: t.field({"required":false,"type":SortOrder}),
  table: t.field({"required":false,"type":SortOrder}),
  transfer: t.field({"required":false,"type":SortOrder}),
  accommodation: t.field({"required":false,"type":SortOrder}),
  createdAt: t.field({"required":false,"type":SortOrder}),
  updatedAt: t.field({"required":false,"type":SortOrder}),
  // 'password' was omitted due to @Pothos.omit found in schema comment
});
export const GuestMaxOrderByAggregateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.GuestMaxOrderByAggregateInput>, false>('GuestMaxOrderByAggregateInput').implement({
  fields: GuestMaxOrderByAggregateInputFields,
});

export const GuestMinOrderByAggregateInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
  familyId: t.field({"required":false,"type":SortOrder}),
  status: t.field({"required":false,"type":SortOrder}),
  email: t.field({"required":false,"type":SortOrder}),
  first_name: t.field({"required":false,"type":SortOrder}),
  last_name: t.field({"required":false,"type":SortOrder}),
  side: t.field({"required":false,"type":SortOrder}),
  type: t.field({"required":false,"type":SortOrder}),
  age: t.field({"required":false,"type":SortOrder}),
  sex: t.field({"required":false,"type":SortOrder}),
  table: t.field({"required":false,"type":SortOrder}),
  transfer: t.field({"required":false,"type":SortOrder}),
  accommodation: t.field({"required":false,"type":SortOrder}),
  createdAt: t.field({"required":false,"type":SortOrder}),
  updatedAt: t.field({"required":false,"type":SortOrder}),
  // 'password' was omitted due to @Pothos.omit found in schema comment
});
export const GuestMinOrderByAggregateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.GuestMinOrderByAggregateInput>, false>('GuestMinOrderByAggregateInput').implement({
  fields: GuestMinOrderByAggregateInputFields,
});

export const GuestSumOrderByAggregateInputFields = (t: any) => ({
  table: t.field({"required":false,"type":SortOrder}),
});
export const GuestSumOrderByAggregateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.GuestSumOrderByAggregateInput>, false>('GuestSumOrderByAggregateInput').implement({
  fields: GuestSumOrderByAggregateInputFields,
});

export const UuidNullableWithAggregatesFilterFields = (t: any) => ({
  equals: t.string({"required":false}),
  in: t.stringList({"required":false}),
  notIn: t.stringList({"required":false}),
  lt: t.string({"required":false}),
  lte: t.string({"required":false}),
  gt: t.string({"required":false}),
  gte: t.string({"required":false}),
  mode: t.field({"required":false,"type":QueryMode}),
  not: t.field({"required":false,"type":NestedUuidNullableWithAggregatesFilter}),
  _count: t.field({"required":false,"type":NestedIntNullableFilter}),
  _min: t.field({"required":false,"type":NestedStringNullableFilter}),
  _max: t.field({"required":false,"type":NestedStringNullableFilter}),
});
export const UuidNullableWithAggregatesFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UuidNullableWithAggregatesFilter>, false>('UuidNullableWithAggregatesFilter').implement({
  fields: UuidNullableWithAggregatesFilterFields,
});

export const EnumStatusWithAggregatesFilterFields = (t: any) => ({
  equals: t.field({"required":false,"type":Status}),
  in: t.field({"required":false,"type":[Status]}),
  notIn: t.field({"required":false,"type":[Status]}),
  not: t.field({"required":false,"type":Status}),
  _count: t.field({"required":false,"type":NestedIntFilter}),
  _min: t.field({"required":false,"type":NestedEnumStatusFilter}),
  _max: t.field({"required":false,"type":NestedEnumStatusFilter}),
});
export const EnumStatusWithAggregatesFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.EnumStatusWithAggregatesFilter>, false>('EnumStatusWithAggregatesFilter').implement({
  fields: EnumStatusWithAggregatesFilterFields,
});

export const StringNullableWithAggregatesFilterFields = (t: any) => ({
  equals: t.string({"required":false}),
  in: t.stringList({"required":false}),
  notIn: t.stringList({"required":false}),
  lt: t.string({"required":false}),
  lte: t.string({"required":false}),
  gt: t.string({"required":false}),
  gte: t.string({"required":false}),
  contains: t.string({"required":false}),
  startsWith: t.string({"required":false}),
  endsWith: t.string({"required":false}),
  mode: t.field({"required":false,"type":QueryMode}),
  not: t.field({"required":false,"type":NestedStringNullableWithAggregatesFilter}),
  _count: t.field({"required":false,"type":NestedIntNullableFilter}),
  _min: t.field({"required":false,"type":NestedStringNullableFilter}),
  _max: t.field({"required":false,"type":NestedStringNullableFilter}),
});
export const StringNullableWithAggregatesFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.StringNullableWithAggregatesFilter>, false>('StringNullableWithAggregatesFilter').implement({
  fields: StringNullableWithAggregatesFilterFields,
});

export const EnumSideWithAggregatesFilterFields = (t: any) => ({
  equals: t.field({"required":false,"type":Side}),
  in: t.field({"required":false,"type":[Side]}),
  notIn: t.field({"required":false,"type":[Side]}),
  not: t.field({"required":false,"type":Side}),
  _count: t.field({"required":false,"type":NestedIntFilter}),
  _min: t.field({"required":false,"type":NestedEnumSideFilter}),
  _max: t.field({"required":false,"type":NestedEnumSideFilter}),
});
export const EnumSideWithAggregatesFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.EnumSideWithAggregatesFilter>, false>('EnumSideWithAggregatesFilter').implement({
  fields: EnumSideWithAggregatesFilterFields,
});

export const EnumTypeWithAggregatesFilterFields = (t: any) => ({
  equals: t.field({"required":false,"type":Type}),
  in: t.field({"required":false,"type":[Type]}),
  notIn: t.field({"required":false,"type":[Type]}),
  not: t.field({"required":false,"type":Type}),
  _count: t.field({"required":false,"type":NestedIntFilter}),
  _min: t.field({"required":false,"type":NestedEnumTypeFilter}),
  _max: t.field({"required":false,"type":NestedEnumTypeFilter}),
});
export const EnumTypeWithAggregatesFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.EnumTypeWithAggregatesFilter>, false>('EnumTypeWithAggregatesFilter').implement({
  fields: EnumTypeWithAggregatesFilterFields,
});

export const EnumAgeWithAggregatesFilterFields = (t: any) => ({
  equals: t.field({"required":false,"type":Age}),
  in: t.field({"required":false,"type":[Age]}),
  notIn: t.field({"required":false,"type":[Age]}),
  not: t.field({"required":false,"type":Age}),
  _count: t.field({"required":false,"type":NestedIntFilter}),
  _min: t.field({"required":false,"type":NestedEnumAgeFilter}),
  _max: t.field({"required":false,"type":NestedEnumAgeFilter}),
});
export const EnumAgeWithAggregatesFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.EnumAgeWithAggregatesFilter>, false>('EnumAgeWithAggregatesFilter').implement({
  fields: EnumAgeWithAggregatesFilterFields,
});

export const EnumSexWithAggregatesFilterFields = (t: any) => ({
  equals: t.field({"required":false,"type":Sex}),
  in: t.field({"required":false,"type":[Sex]}),
  notIn: t.field({"required":false,"type":[Sex]}),
  not: t.field({"required":false,"type":Sex}),
  _count: t.field({"required":false,"type":NestedIntFilter}),
  _min: t.field({"required":false,"type":NestedEnumSexFilter}),
  _max: t.field({"required":false,"type":NestedEnumSexFilter}),
});
export const EnumSexWithAggregatesFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.EnumSexWithAggregatesFilter>, false>('EnumSexWithAggregatesFilter').implement({
  fields: EnumSexWithAggregatesFilterFields,
});

export const IntNullableWithAggregatesFilterFields = (t: any) => ({
  equals: t.int({"required":false}),
  in: t.intList({"required":false}),
  notIn: t.intList({"required":false}),
  lt: t.int({"required":false}),
  lte: t.int({"required":false}),
  gt: t.int({"required":false}),
  gte: t.int({"required":false}),
  not: t.field({"required":false,"type":NestedIntNullableWithAggregatesFilter}),
  _count: t.field({"required":false,"type":NestedIntNullableFilter}),
  _avg: t.field({"required":false,"type":NestedFloatNullableFilter}),
  _sum: t.field({"required":false,"type":NestedIntNullableFilter}),
  _min: t.field({"required":false,"type":NestedIntNullableFilter}),
  _max: t.field({"required":false,"type":NestedIntNullableFilter}),
});
export const IntNullableWithAggregatesFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.IntNullableWithAggregatesFilter>, false>('IntNullableWithAggregatesFilter').implement({
  fields: IntNullableWithAggregatesFilterFields,
});

export const BoolWithAggregatesFilterFields = (t: any) => ({
  equals: t.boolean({"required":false}),
  not: t.field({"required":false,"type":NestedBoolWithAggregatesFilter}),
  _count: t.field({"required":false,"type":NestedIntFilter}),
  _min: t.field({"required":false,"type":NestedBoolFilter}),
  _max: t.field({"required":false,"type":NestedBoolFilter}),
});
export const BoolWithAggregatesFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.BoolWithAggregatesFilter>, false>('BoolWithAggregatesFilter').implement({
  fields: BoolWithAggregatesFilterFields,
});

export const IntFilterFields = (t: any) => ({
  equals: t.int({"required":false}),
  in: t.intList({"required":false}),
  notIn: t.intList({"required":false}),
  lt: t.int({"required":false}),
  lte: t.int({"required":false}),
  gt: t.int({"required":false}),
  gte: t.int({"required":false}),
  not: t.field({"required":false,"type":NestedIntFilter}),
});
export const IntFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.IntFilter>, false>('IntFilter').implement({
  fields: IntFilterFields,
});

export const EventCountOrderByAggregateInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
  index: t.field({"required":false,"type":SortOrder}),
  alias: t.field({"required":false,"type":SortOrder}),
  name: t.field({"required":false,"type":SortOrder}),
  date: t.field({"required":false,"type":SortOrder}),
  start: t.field({"required":false,"type":SortOrder}),
  end: t.field({"required":false,"type":SortOrder}),
  description: t.field({"required":false,"type":SortOrder}),
  address: t.field({"required":false,"type":SortOrder}),
  url: t.field({"required":false,"type":SortOrder}),
  createdAt: t.field({"required":false,"type":SortOrder}),
  updatedAt: t.field({"required":false,"type":SortOrder}),
});
export const EventCountOrderByAggregateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.EventCountOrderByAggregateInput>, false>('EventCountOrderByAggregateInput').implement({
  fields: EventCountOrderByAggregateInputFields,
});

export const EventAvgOrderByAggregateInputFields = (t: any) => ({
  index: t.field({"required":false,"type":SortOrder}),
});
export const EventAvgOrderByAggregateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.EventAvgOrderByAggregateInput>, false>('EventAvgOrderByAggregateInput').implement({
  fields: EventAvgOrderByAggregateInputFields,
});

export const EventMaxOrderByAggregateInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
  index: t.field({"required":false,"type":SortOrder}),
  alias: t.field({"required":false,"type":SortOrder}),
  name: t.field({"required":false,"type":SortOrder}),
  date: t.field({"required":false,"type":SortOrder}),
  start: t.field({"required":false,"type":SortOrder}),
  end: t.field({"required":false,"type":SortOrder}),
  description: t.field({"required":false,"type":SortOrder}),
  address: t.field({"required":false,"type":SortOrder}),
  url: t.field({"required":false,"type":SortOrder}),
  createdAt: t.field({"required":false,"type":SortOrder}),
  updatedAt: t.field({"required":false,"type":SortOrder}),
});
export const EventMaxOrderByAggregateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.EventMaxOrderByAggregateInput>, false>('EventMaxOrderByAggregateInput').implement({
  fields: EventMaxOrderByAggregateInputFields,
});

export const EventMinOrderByAggregateInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
  index: t.field({"required":false,"type":SortOrder}),
  alias: t.field({"required":false,"type":SortOrder}),
  name: t.field({"required":false,"type":SortOrder}),
  date: t.field({"required":false,"type":SortOrder}),
  start: t.field({"required":false,"type":SortOrder}),
  end: t.field({"required":false,"type":SortOrder}),
  description: t.field({"required":false,"type":SortOrder}),
  address: t.field({"required":false,"type":SortOrder}),
  url: t.field({"required":false,"type":SortOrder}),
  createdAt: t.field({"required":false,"type":SortOrder}),
  updatedAt: t.field({"required":false,"type":SortOrder}),
});
export const EventMinOrderByAggregateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.EventMinOrderByAggregateInput>, false>('EventMinOrderByAggregateInput').implement({
  fields: EventMinOrderByAggregateInputFields,
});

export const EventSumOrderByAggregateInputFields = (t: any) => ({
  index: t.field({"required":false,"type":SortOrder}),
});
export const EventSumOrderByAggregateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.EventSumOrderByAggregateInput>, false>('EventSumOrderByAggregateInput').implement({
  fields: EventSumOrderByAggregateInputFields,
});

export const IntWithAggregatesFilterFields = (t: any) => ({
  equals: t.int({"required":false}),
  in: t.intList({"required":false}),
  notIn: t.intList({"required":false}),
  lt: t.int({"required":false}),
  lte: t.int({"required":false}),
  gt: t.int({"required":false}),
  gte: t.int({"required":false}),
  not: t.field({"required":false,"type":NestedIntWithAggregatesFilter}),
  _count: t.field({"required":false,"type":NestedIntFilter}),
  _avg: t.field({"required":false,"type":NestedFloatFilter}),
  _sum: t.field({"required":false,"type":NestedIntFilter}),
  _min: t.field({"required":false,"type":NestedIntFilter}),
  _max: t.field({"required":false,"type":NestedIntFilter}),
});
export const IntWithAggregatesFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.IntWithAggregatesFilter>, false>('IntWithAggregatesFilter').implement({
  fields: IntWithAggregatesFilterFields,
});

export const GuestCreateNestedOneWithoutOwnedFamilyInputFields = (t: any) => ({
  create: t.field({"required":false,"type":GuestCreateWithoutOwnedFamilyInput}),
  connectOrCreate: t.field({"required":false,"type":GuestCreateOrConnectWithoutOwnedFamilyInput}),
  connect: t.field({"required":false,"type":GuestWhereUniqueInput}),
});
export const GuestCreateNestedOneWithoutOwnedFamilyInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.GuestCreateNestedOneWithoutOwnedFamilyInput>, false>('GuestCreateNestedOneWithoutOwnedFamilyInput').implement({
  fields: GuestCreateNestedOneWithoutOwnedFamilyInputFields,
});

export const GuestCreateNestedManyWithoutFamilyInputFields = (t: any) => ({
  create: t.field({"required":false,"type":[GuestCreateWithoutFamilyInput]}),
  connectOrCreate: t.field({"required":false,"type":[GuestCreateOrConnectWithoutFamilyInput]}),
  createMany: t.field({"required":false,"type":GuestCreateManyFamilyInputEnvelope}),
  connect: t.field({"required":false,"type":[GuestWhereUniqueInput]}),
});
export const GuestCreateNestedManyWithoutFamilyInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.GuestCreateNestedManyWithoutFamilyInput>, false>('GuestCreateNestedManyWithoutFamilyInput').implement({
  fields: GuestCreateNestedManyWithoutFamilyInputFields,
});

export const StringFieldUpdateOperationsInputFields = (t: any) => ({
  set: t.string({"required":false}),
});
export const StringFieldUpdateOperationsInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.StringFieldUpdateOperationsInput>, false>('StringFieldUpdateOperationsInput').implement({
  fields: StringFieldUpdateOperationsInputFields,
});

export const DateTimeFieldUpdateOperationsInputFields = (t: any) => ({
  set: t.field({"required":false,"type":DateTime}),
});
export const DateTimeFieldUpdateOperationsInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.DateTimeFieldUpdateOperationsInput>, false>('DateTimeFieldUpdateOperationsInput').implement({
  fields: DateTimeFieldUpdateOperationsInputFields,
});

export const GuestUpdateOneRequiredWithoutOwnedFamilyNestedInputFields = (t: any) => ({
  create: t.field({"required":false,"type":GuestCreateWithoutOwnedFamilyInput}),
  connectOrCreate: t.field({"required":false,"type":GuestCreateOrConnectWithoutOwnedFamilyInput}),
  upsert: t.field({"required":false,"type":GuestUpsertWithoutOwnedFamilyInput}),
  connect: t.field({"required":false,"type":GuestWhereUniqueInput}),
  update: t.field({"required":false,"type":GuestUpdateToOneWithWhereWithoutOwnedFamilyInput}),
});
export const GuestUpdateOneRequiredWithoutOwnedFamilyNestedInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.GuestUpdateOneRequiredWithoutOwnedFamilyNestedInput>, false>('GuestUpdateOneRequiredWithoutOwnedFamilyNestedInput').implement({
  fields: GuestUpdateOneRequiredWithoutOwnedFamilyNestedInputFields,
});

export const GuestUpdateManyWithoutFamilyNestedInputFields = (t: any) => ({
  create: t.field({"required":false,"type":[GuestCreateWithoutFamilyInput]}),
  connectOrCreate: t.field({"required":false,"type":[GuestCreateOrConnectWithoutFamilyInput]}),
  upsert: t.field({"required":false,"type":[GuestUpsertWithWhereUniqueWithoutFamilyInput]}),
  createMany: t.field({"required":false,"type":GuestCreateManyFamilyInputEnvelope}),
  set: t.field({"required":false,"type":[GuestWhereUniqueInput]}),
  disconnect: t.field({"required":false,"type":[GuestWhereUniqueInput]}),
  delete: t.field({"required":false,"type":[GuestWhereUniqueInput]}),
  connect: t.field({"required":false,"type":[GuestWhereUniqueInput]}),
  update: t.field({"required":false,"type":[GuestUpdateWithWhereUniqueWithoutFamilyInput]}),
  updateMany: t.field({"required":false,"type":[GuestUpdateManyWithWhereWithoutFamilyInput]}),
  deleteMany: t.field({"required":false,"type":[GuestScalarWhereInput]}),
});
export const GuestUpdateManyWithoutFamilyNestedInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.GuestUpdateManyWithoutFamilyNestedInput>, false>('GuestUpdateManyWithoutFamilyNestedInput').implement({
  fields: GuestUpdateManyWithoutFamilyNestedInputFields,
});

export const FamilyCreateNestedOneWithoutMembersInputFields = (t: any) => ({
  create: t.field({"required":false,"type":FamilyCreateWithoutMembersInput}),
  connectOrCreate: t.field({"required":false,"type":FamilyCreateOrConnectWithoutMembersInput}),
  connect: t.field({"required":false,"type":FamilyWhereUniqueInput}),
});
export const FamilyCreateNestedOneWithoutMembersInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.FamilyCreateNestedOneWithoutMembersInput>, false>('FamilyCreateNestedOneWithoutMembersInput').implement({
  fields: FamilyCreateNestedOneWithoutMembersInputFields,
});

export const FamilyCreateNestedOneWithoutOwnerInputFields = (t: any) => ({
  create: t.field({"required":false,"type":FamilyCreateWithoutOwnerInput}),
  connectOrCreate: t.field({"required":false,"type":FamilyCreateOrConnectWithoutOwnerInput}),
  connect: t.field({"required":false,"type":FamilyWhereUniqueInput}),
});
export const FamilyCreateNestedOneWithoutOwnerInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.FamilyCreateNestedOneWithoutOwnerInput>, false>('FamilyCreateNestedOneWithoutOwnerInput').implement({
  fields: FamilyCreateNestedOneWithoutOwnerInputFields,
});

export const EventCreateNestedManyWithoutGuestsInputFields = (t: any) => ({
  create: t.field({"required":false,"type":[EventCreateWithoutGuestsInput]}),
  connectOrCreate: t.field({"required":false,"type":[EventCreateOrConnectWithoutGuestsInput]}),
  connect: t.field({"required":false,"type":[EventWhereUniqueInput]}),
});
export const EventCreateNestedManyWithoutGuestsInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.EventCreateNestedManyWithoutGuestsInput>, false>('EventCreateNestedManyWithoutGuestsInput').implement({
  fields: EventCreateNestedManyWithoutGuestsInputFields,
});

export const EnumStatusFieldUpdateOperationsInputFields = (t: any) => ({
  set: t.field({"required":false,"type":Status}),
});
export const EnumStatusFieldUpdateOperationsInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.EnumStatusFieldUpdateOperationsInput>, false>('EnumStatusFieldUpdateOperationsInput').implement({
  fields: EnumStatusFieldUpdateOperationsInputFields,
});

export const NullableStringFieldUpdateOperationsInputFields = (t: any) => ({
  set: t.string({"required":false}),
});
export const NullableStringFieldUpdateOperationsInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.NullableStringFieldUpdateOperationsInput>, false>('NullableStringFieldUpdateOperationsInput').implement({
  fields: NullableStringFieldUpdateOperationsInputFields,
});

export const EnumSideFieldUpdateOperationsInputFields = (t: any) => ({
  set: t.field({"required":false,"type":Side}),
});
export const EnumSideFieldUpdateOperationsInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.EnumSideFieldUpdateOperationsInput>, false>('EnumSideFieldUpdateOperationsInput').implement({
  fields: EnumSideFieldUpdateOperationsInputFields,
});

export const EnumTypeFieldUpdateOperationsInputFields = (t: any) => ({
  set: t.field({"required":false,"type":Type}),
});
export const EnumTypeFieldUpdateOperationsInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.EnumTypeFieldUpdateOperationsInput>, false>('EnumTypeFieldUpdateOperationsInput').implement({
  fields: EnumTypeFieldUpdateOperationsInputFields,
});

export const EnumAgeFieldUpdateOperationsInputFields = (t: any) => ({
  set: t.field({"required":false,"type":Age}),
});
export const EnumAgeFieldUpdateOperationsInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.EnumAgeFieldUpdateOperationsInput>, false>('EnumAgeFieldUpdateOperationsInput').implement({
  fields: EnumAgeFieldUpdateOperationsInputFields,
});

export const EnumSexFieldUpdateOperationsInputFields = (t: any) => ({
  set: t.field({"required":false,"type":Sex}),
});
export const EnumSexFieldUpdateOperationsInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.EnumSexFieldUpdateOperationsInput>, false>('EnumSexFieldUpdateOperationsInput').implement({
  fields: EnumSexFieldUpdateOperationsInputFields,
});

export const NullableIntFieldUpdateOperationsInputFields = (t: any) => ({
  set: t.int({"required":false}),
  increment: t.int({"required":false}),
  decrement: t.int({"required":false}),
  multiply: t.int({"required":false}),
  divide: t.int({"required":false}),
});
export const NullableIntFieldUpdateOperationsInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.NullableIntFieldUpdateOperationsInput>, false>('NullableIntFieldUpdateOperationsInput').implement({
  fields: NullableIntFieldUpdateOperationsInputFields,
});

export const BoolFieldUpdateOperationsInputFields = (t: any) => ({
  set: t.boolean({"required":false}),
});
export const BoolFieldUpdateOperationsInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.BoolFieldUpdateOperationsInput>, false>('BoolFieldUpdateOperationsInput').implement({
  fields: BoolFieldUpdateOperationsInputFields,
});

export const FamilyUpdateOneWithoutMembersNestedInputFields = (t: any) => ({
  create: t.field({"required":false,"type":FamilyCreateWithoutMembersInput}),
  connectOrCreate: t.field({"required":false,"type":FamilyCreateOrConnectWithoutMembersInput}),
  upsert: t.field({"required":false,"type":FamilyUpsertWithoutMembersInput}),
  disconnect: t.field({"required":false,"type":FamilyWhereInput}),
  delete: t.field({"required":false,"type":FamilyWhereInput}),
  connect: t.field({"required":false,"type":FamilyWhereUniqueInput}),
  update: t.field({"required":false,"type":FamilyUpdateToOneWithWhereWithoutMembersInput}),
});
export const FamilyUpdateOneWithoutMembersNestedInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.FamilyUpdateOneWithoutMembersNestedInput>, false>('FamilyUpdateOneWithoutMembersNestedInput').implement({
  fields: FamilyUpdateOneWithoutMembersNestedInputFields,
});

export const FamilyUpdateOneWithoutOwnerNestedInputFields = (t: any) => ({
  create: t.field({"required":false,"type":FamilyCreateWithoutOwnerInput}),
  connectOrCreate: t.field({"required":false,"type":FamilyCreateOrConnectWithoutOwnerInput}),
  upsert: t.field({"required":false,"type":FamilyUpsertWithoutOwnerInput}),
  disconnect: t.field({"required":false,"type":FamilyWhereInput}),
  delete: t.field({"required":false,"type":FamilyWhereInput}),
  connect: t.field({"required":false,"type":FamilyWhereUniqueInput}),
  update: t.field({"required":false,"type":FamilyUpdateToOneWithWhereWithoutOwnerInput}),
});
export const FamilyUpdateOneWithoutOwnerNestedInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.FamilyUpdateOneWithoutOwnerNestedInput>, false>('FamilyUpdateOneWithoutOwnerNestedInput').implement({
  fields: FamilyUpdateOneWithoutOwnerNestedInputFields,
});

export const EventUpdateManyWithoutGuestsNestedInputFields = (t: any) => ({
  create: t.field({"required":false,"type":[EventCreateWithoutGuestsInput]}),
  connectOrCreate: t.field({"required":false,"type":[EventCreateOrConnectWithoutGuestsInput]}),
  upsert: t.field({"required":false,"type":[EventUpsertWithWhereUniqueWithoutGuestsInput]}),
  set: t.field({"required":false,"type":[EventWhereUniqueInput]}),
  disconnect: t.field({"required":false,"type":[EventWhereUniqueInput]}),
  delete: t.field({"required":false,"type":[EventWhereUniqueInput]}),
  connect: t.field({"required":false,"type":[EventWhereUniqueInput]}),
  update: t.field({"required":false,"type":[EventUpdateWithWhereUniqueWithoutGuestsInput]}),
  updateMany: t.field({"required":false,"type":[EventUpdateManyWithWhereWithoutGuestsInput]}),
  deleteMany: t.field({"required":false,"type":[EventScalarWhereInput]}),
});
export const EventUpdateManyWithoutGuestsNestedInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.EventUpdateManyWithoutGuestsNestedInput>, false>('EventUpdateManyWithoutGuestsNestedInput').implement({
  fields: EventUpdateManyWithoutGuestsNestedInputFields,
});

export const GuestCreateNestedManyWithoutEventsInputFields = (t: any) => ({
  create: t.field({"required":false,"type":[GuestCreateWithoutEventsInput]}),
  connectOrCreate: t.field({"required":false,"type":[GuestCreateOrConnectWithoutEventsInput]}),
  connect: t.field({"required":false,"type":[GuestWhereUniqueInput]}),
});
export const GuestCreateNestedManyWithoutEventsInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.GuestCreateNestedManyWithoutEventsInput>, false>('GuestCreateNestedManyWithoutEventsInput').implement({
  fields: GuestCreateNestedManyWithoutEventsInputFields,
});

export const IntFieldUpdateOperationsInputFields = (t: any) => ({
  set: t.int({"required":false}),
  increment: t.int({"required":false}),
  decrement: t.int({"required":false}),
  multiply: t.int({"required":false}),
  divide: t.int({"required":false}),
});
export const IntFieldUpdateOperationsInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.IntFieldUpdateOperationsInput>, false>('IntFieldUpdateOperationsInput').implement({
  fields: IntFieldUpdateOperationsInputFields,
});

export const GuestUpdateManyWithoutEventsNestedInputFields = (t: any) => ({
  create: t.field({"required":false,"type":[GuestCreateWithoutEventsInput]}),
  connectOrCreate: t.field({"required":false,"type":[GuestCreateOrConnectWithoutEventsInput]}),
  upsert: t.field({"required":false,"type":[GuestUpsertWithWhereUniqueWithoutEventsInput]}),
  set: t.field({"required":false,"type":[GuestWhereUniqueInput]}),
  disconnect: t.field({"required":false,"type":[GuestWhereUniqueInput]}),
  delete: t.field({"required":false,"type":[GuestWhereUniqueInput]}),
  connect: t.field({"required":false,"type":[GuestWhereUniqueInput]}),
  update: t.field({"required":false,"type":[GuestUpdateWithWhereUniqueWithoutEventsInput]}),
  updateMany: t.field({"required":false,"type":[GuestUpdateManyWithWhereWithoutEventsInput]}),
  deleteMany: t.field({"required":false,"type":[GuestScalarWhereInput]}),
});
export const GuestUpdateManyWithoutEventsNestedInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.GuestUpdateManyWithoutEventsNestedInput>, false>('GuestUpdateManyWithoutEventsNestedInput').implement({
  fields: GuestUpdateManyWithoutEventsNestedInputFields,
});

export const NestedUuidFilterFields = (t: any) => ({
  equals: t.string({"required":false}),
  in: t.stringList({"required":false}),
  notIn: t.stringList({"required":false}),
  lt: t.string({"required":false}),
  lte: t.string({"required":false}),
  gt: t.string({"required":false}),
  gte: t.string({"required":false}),
  not: t.field({"required":false,"type":NestedUuidFilter}),
});
export const NestedUuidFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.NestedUuidFilter>, false>('NestedUuidFilter').implement({
  fields: NestedUuidFilterFields,
});

export const NestedStringFilterFields = (t: any) => ({
  equals: t.string({"required":false}),
  in: t.stringList({"required":false}),
  notIn: t.stringList({"required":false}),
  lt: t.string({"required":false}),
  lte: t.string({"required":false}),
  gt: t.string({"required":false}),
  gte: t.string({"required":false}),
  contains: t.string({"required":false}),
  startsWith: t.string({"required":false}),
  endsWith: t.string({"required":false}),
  not: t.field({"required":false,"type":NestedStringFilter}),
});
export const NestedStringFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.NestedStringFilter>, false>('NestedStringFilter').implement({
  fields: NestedStringFilterFields,
});

export const NestedDateTimeFilterFields = (t: any) => ({
  equals: t.field({"required":false,"type":DateTime}),
  in: t.field({"required":false,"type":[DateTime]}),
  notIn: t.field({"required":false,"type":[DateTime]}),
  lt: t.field({"required":false,"type":DateTime}),
  lte: t.field({"required":false,"type":DateTime}),
  gt: t.field({"required":false,"type":DateTime}),
  gte: t.field({"required":false,"type":DateTime}),
  not: t.field({"required":false,"type":NestedDateTimeFilter}),
});
export const NestedDateTimeFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.NestedDateTimeFilter>, false>('NestedDateTimeFilter').implement({
  fields: NestedDateTimeFilterFields,
});

export const NestedUuidWithAggregatesFilterFields = (t: any) => ({
  equals: t.string({"required":false}),
  in: t.stringList({"required":false}),
  notIn: t.stringList({"required":false}),
  lt: t.string({"required":false}),
  lte: t.string({"required":false}),
  gt: t.string({"required":false}),
  gte: t.string({"required":false}),
  not: t.field({"required":false,"type":NestedUuidWithAggregatesFilter}),
  _count: t.field({"required":false,"type":NestedIntFilter}),
  _min: t.field({"required":false,"type":NestedStringFilter}),
  _max: t.field({"required":false,"type":NestedStringFilter}),
});
export const NestedUuidWithAggregatesFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.NestedUuidWithAggregatesFilter>, false>('NestedUuidWithAggregatesFilter').implement({
  fields: NestedUuidWithAggregatesFilterFields,
});

export const NestedIntFilterFields = (t: any) => ({
  equals: t.int({"required":false}),
  in: t.intList({"required":false}),
  notIn: t.intList({"required":false}),
  lt: t.int({"required":false}),
  lte: t.int({"required":false}),
  gt: t.int({"required":false}),
  gte: t.int({"required":false}),
  not: t.field({"required":false,"type":NestedIntFilter}),
});
export const NestedIntFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.NestedIntFilter>, false>('NestedIntFilter').implement({
  fields: NestedIntFilterFields,
});

export const NestedStringWithAggregatesFilterFields = (t: any) => ({
  equals: t.string({"required":false}),
  in: t.stringList({"required":false}),
  notIn: t.stringList({"required":false}),
  lt: t.string({"required":false}),
  lte: t.string({"required":false}),
  gt: t.string({"required":false}),
  gte: t.string({"required":false}),
  contains: t.string({"required":false}),
  startsWith: t.string({"required":false}),
  endsWith: t.string({"required":false}),
  not: t.field({"required":false,"type":NestedStringWithAggregatesFilter}),
  _count: t.field({"required":false,"type":NestedIntFilter}),
  _min: t.field({"required":false,"type":NestedStringFilter}),
  _max: t.field({"required":false,"type":NestedStringFilter}),
});
export const NestedStringWithAggregatesFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.NestedStringWithAggregatesFilter>, false>('NestedStringWithAggregatesFilter').implement({
  fields: NestedStringWithAggregatesFilterFields,
});

export const NestedDateTimeWithAggregatesFilterFields = (t: any) => ({
  equals: t.field({"required":false,"type":DateTime}),
  in: t.field({"required":false,"type":[DateTime]}),
  notIn: t.field({"required":false,"type":[DateTime]}),
  lt: t.field({"required":false,"type":DateTime}),
  lte: t.field({"required":false,"type":DateTime}),
  gt: t.field({"required":false,"type":DateTime}),
  gte: t.field({"required":false,"type":DateTime}),
  not: t.field({"required":false,"type":NestedDateTimeWithAggregatesFilter}),
  _count: t.field({"required":false,"type":NestedIntFilter}),
  _min: t.field({"required":false,"type":NestedDateTimeFilter}),
  _max: t.field({"required":false,"type":NestedDateTimeFilter}),
});
export const NestedDateTimeWithAggregatesFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.NestedDateTimeWithAggregatesFilter>, false>('NestedDateTimeWithAggregatesFilter').implement({
  fields: NestedDateTimeWithAggregatesFilterFields,
});

export const NestedUuidNullableFilterFields = (t: any) => ({
  equals: t.string({"required":false}),
  in: t.stringList({"required":false}),
  notIn: t.stringList({"required":false}),
  lt: t.string({"required":false}),
  lte: t.string({"required":false}),
  gt: t.string({"required":false}),
  gte: t.string({"required":false}),
  not: t.field({"required":false,"type":NestedUuidNullableFilter}),
});
export const NestedUuidNullableFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.NestedUuidNullableFilter>, false>('NestedUuidNullableFilter').implement({
  fields: NestedUuidNullableFilterFields,
});

export const NestedEnumStatusFilterFields = (t: any) => ({
  equals: t.field({"required":false,"type":Status}),
  in: t.field({"required":false,"type":[Status]}),
  notIn: t.field({"required":false,"type":[Status]}),
  not: t.field({"required":false,"type":Status}),
});
export const NestedEnumStatusFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.NestedEnumStatusFilter>, false>('NestedEnumStatusFilter').implement({
  fields: NestedEnumStatusFilterFields,
});

export const NestedStringNullableFilterFields = (t: any) => ({
  equals: t.string({"required":false}),
  in: t.stringList({"required":false}),
  notIn: t.stringList({"required":false}),
  lt: t.string({"required":false}),
  lte: t.string({"required":false}),
  gt: t.string({"required":false}),
  gte: t.string({"required":false}),
  contains: t.string({"required":false}),
  startsWith: t.string({"required":false}),
  endsWith: t.string({"required":false}),
  not: t.field({"required":false,"type":NestedStringNullableFilter}),
});
export const NestedStringNullableFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.NestedStringNullableFilter>, false>('NestedStringNullableFilter').implement({
  fields: NestedStringNullableFilterFields,
});

export const NestedEnumSideFilterFields = (t: any) => ({
  equals: t.field({"required":false,"type":Side}),
  in: t.field({"required":false,"type":[Side]}),
  notIn: t.field({"required":false,"type":[Side]}),
  not: t.field({"required":false,"type":Side}),
});
export const NestedEnumSideFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.NestedEnumSideFilter>, false>('NestedEnumSideFilter').implement({
  fields: NestedEnumSideFilterFields,
});

export const NestedEnumTypeFilterFields = (t: any) => ({
  equals: t.field({"required":false,"type":Type}),
  in: t.field({"required":false,"type":[Type]}),
  notIn: t.field({"required":false,"type":[Type]}),
  not: t.field({"required":false,"type":Type}),
});
export const NestedEnumTypeFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.NestedEnumTypeFilter>, false>('NestedEnumTypeFilter').implement({
  fields: NestedEnumTypeFilterFields,
});

export const NestedEnumAgeFilterFields = (t: any) => ({
  equals: t.field({"required":false,"type":Age}),
  in: t.field({"required":false,"type":[Age]}),
  notIn: t.field({"required":false,"type":[Age]}),
  not: t.field({"required":false,"type":Age}),
});
export const NestedEnumAgeFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.NestedEnumAgeFilter>, false>('NestedEnumAgeFilter').implement({
  fields: NestedEnumAgeFilterFields,
});

export const NestedEnumSexFilterFields = (t: any) => ({
  equals: t.field({"required":false,"type":Sex}),
  in: t.field({"required":false,"type":[Sex]}),
  notIn: t.field({"required":false,"type":[Sex]}),
  not: t.field({"required":false,"type":Sex}),
});
export const NestedEnumSexFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.NestedEnumSexFilter>, false>('NestedEnumSexFilter').implement({
  fields: NestedEnumSexFilterFields,
});

export const NestedIntNullableFilterFields = (t: any) => ({
  equals: t.int({"required":false}),
  in: t.intList({"required":false}),
  notIn: t.intList({"required":false}),
  lt: t.int({"required":false}),
  lte: t.int({"required":false}),
  gt: t.int({"required":false}),
  gte: t.int({"required":false}),
  not: t.field({"required":false,"type":NestedIntNullableFilter}),
});
export const NestedIntNullableFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.NestedIntNullableFilter>, false>('NestedIntNullableFilter').implement({
  fields: NestedIntNullableFilterFields,
});

export const NestedBoolFilterFields = (t: any) => ({
  equals: t.boolean({"required":false}),
  not: t.field({"required":false,"type":NestedBoolFilter}),
});
export const NestedBoolFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.NestedBoolFilter>, false>('NestedBoolFilter').implement({
  fields: NestedBoolFilterFields,
});

export const NestedUuidNullableWithAggregatesFilterFields = (t: any) => ({
  equals: t.string({"required":false}),
  in: t.stringList({"required":false}),
  notIn: t.stringList({"required":false}),
  lt: t.string({"required":false}),
  lte: t.string({"required":false}),
  gt: t.string({"required":false}),
  gte: t.string({"required":false}),
  not: t.field({"required":false,"type":NestedUuidNullableWithAggregatesFilter}),
  _count: t.field({"required":false,"type":NestedIntNullableFilter}),
  _min: t.field({"required":false,"type":NestedStringNullableFilter}),
  _max: t.field({"required":false,"type":NestedStringNullableFilter}),
});
export const NestedUuidNullableWithAggregatesFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.NestedUuidNullableWithAggregatesFilter>, false>('NestedUuidNullableWithAggregatesFilter').implement({
  fields: NestedUuidNullableWithAggregatesFilterFields,
});

export const NestedEnumStatusWithAggregatesFilterFields = (t: any) => ({
  equals: t.field({"required":false,"type":Status}),
  in: t.field({"required":false,"type":[Status]}),
  notIn: t.field({"required":false,"type":[Status]}),
  not: t.field({"required":false,"type":Status}),
  _count: t.field({"required":false,"type":NestedIntFilter}),
  _min: t.field({"required":false,"type":NestedEnumStatusFilter}),
  _max: t.field({"required":false,"type":NestedEnumStatusFilter}),
});
export const NestedEnumStatusWithAggregatesFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.NestedEnumStatusWithAggregatesFilter>, false>('NestedEnumStatusWithAggregatesFilter').implement({
  fields: NestedEnumStatusWithAggregatesFilterFields,
});

export const NestedStringNullableWithAggregatesFilterFields = (t: any) => ({
  equals: t.string({"required":false}),
  in: t.stringList({"required":false}),
  notIn: t.stringList({"required":false}),
  lt: t.string({"required":false}),
  lte: t.string({"required":false}),
  gt: t.string({"required":false}),
  gte: t.string({"required":false}),
  contains: t.string({"required":false}),
  startsWith: t.string({"required":false}),
  endsWith: t.string({"required":false}),
  not: t.field({"required":false,"type":NestedStringNullableWithAggregatesFilter}),
  _count: t.field({"required":false,"type":NestedIntNullableFilter}),
  _min: t.field({"required":false,"type":NestedStringNullableFilter}),
  _max: t.field({"required":false,"type":NestedStringNullableFilter}),
});
export const NestedStringNullableWithAggregatesFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.NestedStringNullableWithAggregatesFilter>, false>('NestedStringNullableWithAggregatesFilter').implement({
  fields: NestedStringNullableWithAggregatesFilterFields,
});

export const NestedEnumSideWithAggregatesFilterFields = (t: any) => ({
  equals: t.field({"required":false,"type":Side}),
  in: t.field({"required":false,"type":[Side]}),
  notIn: t.field({"required":false,"type":[Side]}),
  not: t.field({"required":false,"type":Side}),
  _count: t.field({"required":false,"type":NestedIntFilter}),
  _min: t.field({"required":false,"type":NestedEnumSideFilter}),
  _max: t.field({"required":false,"type":NestedEnumSideFilter}),
});
export const NestedEnumSideWithAggregatesFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.NestedEnumSideWithAggregatesFilter>, false>('NestedEnumSideWithAggregatesFilter').implement({
  fields: NestedEnumSideWithAggregatesFilterFields,
});

export const NestedEnumTypeWithAggregatesFilterFields = (t: any) => ({
  equals: t.field({"required":false,"type":Type}),
  in: t.field({"required":false,"type":[Type]}),
  notIn: t.field({"required":false,"type":[Type]}),
  not: t.field({"required":false,"type":Type}),
  _count: t.field({"required":false,"type":NestedIntFilter}),
  _min: t.field({"required":false,"type":NestedEnumTypeFilter}),
  _max: t.field({"required":false,"type":NestedEnumTypeFilter}),
});
export const NestedEnumTypeWithAggregatesFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.NestedEnumTypeWithAggregatesFilter>, false>('NestedEnumTypeWithAggregatesFilter').implement({
  fields: NestedEnumTypeWithAggregatesFilterFields,
});

export const NestedEnumAgeWithAggregatesFilterFields = (t: any) => ({
  equals: t.field({"required":false,"type":Age}),
  in: t.field({"required":false,"type":[Age]}),
  notIn: t.field({"required":false,"type":[Age]}),
  not: t.field({"required":false,"type":Age}),
  _count: t.field({"required":false,"type":NestedIntFilter}),
  _min: t.field({"required":false,"type":NestedEnumAgeFilter}),
  _max: t.field({"required":false,"type":NestedEnumAgeFilter}),
});
export const NestedEnumAgeWithAggregatesFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.NestedEnumAgeWithAggregatesFilter>, false>('NestedEnumAgeWithAggregatesFilter').implement({
  fields: NestedEnumAgeWithAggregatesFilterFields,
});

export const NestedEnumSexWithAggregatesFilterFields = (t: any) => ({
  equals: t.field({"required":false,"type":Sex}),
  in: t.field({"required":false,"type":[Sex]}),
  notIn: t.field({"required":false,"type":[Sex]}),
  not: t.field({"required":false,"type":Sex}),
  _count: t.field({"required":false,"type":NestedIntFilter}),
  _min: t.field({"required":false,"type":NestedEnumSexFilter}),
  _max: t.field({"required":false,"type":NestedEnumSexFilter}),
});
export const NestedEnumSexWithAggregatesFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.NestedEnumSexWithAggregatesFilter>, false>('NestedEnumSexWithAggregatesFilter').implement({
  fields: NestedEnumSexWithAggregatesFilterFields,
});

export const NestedIntNullableWithAggregatesFilterFields = (t: any) => ({
  equals: t.int({"required":false}),
  in: t.intList({"required":false}),
  notIn: t.intList({"required":false}),
  lt: t.int({"required":false}),
  lte: t.int({"required":false}),
  gt: t.int({"required":false}),
  gte: t.int({"required":false}),
  not: t.field({"required":false,"type":NestedIntNullableWithAggregatesFilter}),
  _count: t.field({"required":false,"type":NestedIntNullableFilter}),
  _avg: t.field({"required":false,"type":NestedFloatNullableFilter}),
  _sum: t.field({"required":false,"type":NestedIntNullableFilter}),
  _min: t.field({"required":false,"type":NestedIntNullableFilter}),
  _max: t.field({"required":false,"type":NestedIntNullableFilter}),
});
export const NestedIntNullableWithAggregatesFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.NestedIntNullableWithAggregatesFilter>, false>('NestedIntNullableWithAggregatesFilter').implement({
  fields: NestedIntNullableWithAggregatesFilterFields,
});

export const NestedFloatNullableFilterFields = (t: any) => ({
  equals: t.float({"required":false}),
  in: t.floatList({"required":false}),
  notIn: t.floatList({"required":false}),
  lt: t.float({"required":false}),
  lte: t.float({"required":false}),
  gt: t.float({"required":false}),
  gte: t.float({"required":false}),
  not: t.field({"required":false,"type":NestedFloatNullableFilter}),
});
export const NestedFloatNullableFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.NestedFloatNullableFilter>, false>('NestedFloatNullableFilter').implement({
  fields: NestedFloatNullableFilterFields,
});

export const NestedBoolWithAggregatesFilterFields = (t: any) => ({
  equals: t.boolean({"required":false}),
  not: t.field({"required":false,"type":NestedBoolWithAggregatesFilter}),
  _count: t.field({"required":false,"type":NestedIntFilter}),
  _min: t.field({"required":false,"type":NestedBoolFilter}),
  _max: t.field({"required":false,"type":NestedBoolFilter}),
});
export const NestedBoolWithAggregatesFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.NestedBoolWithAggregatesFilter>, false>('NestedBoolWithAggregatesFilter').implement({
  fields: NestedBoolWithAggregatesFilterFields,
});

export const NestedIntWithAggregatesFilterFields = (t: any) => ({
  equals: t.int({"required":false}),
  in: t.intList({"required":false}),
  notIn: t.intList({"required":false}),
  lt: t.int({"required":false}),
  lte: t.int({"required":false}),
  gt: t.int({"required":false}),
  gte: t.int({"required":false}),
  not: t.field({"required":false,"type":NestedIntWithAggregatesFilter}),
  _count: t.field({"required":false,"type":NestedIntFilter}),
  _avg: t.field({"required":false,"type":NestedFloatFilter}),
  _sum: t.field({"required":false,"type":NestedIntFilter}),
  _min: t.field({"required":false,"type":NestedIntFilter}),
  _max: t.field({"required":false,"type":NestedIntFilter}),
});
export const NestedIntWithAggregatesFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.NestedIntWithAggregatesFilter>, false>('NestedIntWithAggregatesFilter').implement({
  fields: NestedIntWithAggregatesFilterFields,
});

export const NestedFloatFilterFields = (t: any) => ({
  equals: t.float({"required":false}),
  in: t.floatList({"required":false}),
  notIn: t.floatList({"required":false}),
  lt: t.float({"required":false}),
  lte: t.float({"required":false}),
  gt: t.float({"required":false}),
  gte: t.float({"required":false}),
  not: t.field({"required":false,"type":NestedFloatFilter}),
});
export const NestedFloatFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.NestedFloatFilter>, false>('NestedFloatFilter').implement({
  fields: NestedFloatFilterFields,
});

export const GuestCreateWithoutOwnedFamilyInputFields = (t: any) => ({
  status: t.field({"required":false,"type":Status}),
  email: t.string({"required":true}),
  first_name: t.string({"required":true}),
  last_name: t.string({"required":false}),
  side: t.field({"required":true,"type":Side}),
  type: t.field({"required":false,"type":Type}),
  age: t.field({"required":false,"type":Age}),
  sex: t.field({"required":true,"type":Sex}),
  table: t.int({"required":false}),
  transfer: t.boolean({"required":false}),
  accommodation: t.boolean({"required":false}),
  family: t.field({"required":false,"type":FamilyCreateNestedOneWithoutMembersInput}),
  // 'id' was omitted due to @Pothos.omit found in schema comment
  // 'password' was omitted due to @Pothos.omit found in schema comment
  // 'createdAt' was omitted due to @Pothos.omit found in schema comment
  // 'updatedAt' was omitted due to @Pothos.omit found in schema comment
  // 'events' was omitted due to @Pothos.omit found in schema comment
});
export const GuestCreateWithoutOwnedFamilyInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.GuestCreateWithoutOwnedFamilyInput>, false>('GuestCreateWithoutOwnedFamilyInput').implement({
  fields: GuestCreateWithoutOwnedFamilyInputFields,
});

export const GuestCreateOrConnectWithoutOwnedFamilyInputFields = (t: any) => ({
  where: t.field({"required":true,"type":GuestWhereUniqueInput}),
  create: t.field({"required":true,"type":GuestCreateWithoutOwnedFamilyInput}),
});
export const GuestCreateOrConnectWithoutOwnedFamilyInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.GuestCreateOrConnectWithoutOwnedFamilyInput>, false>('GuestCreateOrConnectWithoutOwnedFamilyInput').implement({
  fields: GuestCreateOrConnectWithoutOwnedFamilyInputFields,
});

export const GuestCreateWithoutFamilyInputFields = (t: any) => ({
  status: t.field({"required":false,"type":Status}),
  email: t.string({"required":true}),
  first_name: t.string({"required":true}),
  last_name: t.string({"required":false}),
  side: t.field({"required":true,"type":Side}),
  type: t.field({"required":false,"type":Type}),
  age: t.field({"required":false,"type":Age}),
  sex: t.field({"required":true,"type":Sex}),
  table: t.int({"required":false}),
  transfer: t.boolean({"required":false}),
  accommodation: t.boolean({"required":false}),
  // 'id' was omitted due to @Pothos.omit found in schema comment
  // 'password' was omitted due to @Pothos.omit found in schema comment
  // 'createdAt' was omitted due to @Pothos.omit found in schema comment
  // 'updatedAt' was omitted due to @Pothos.omit found in schema comment
  // 'ownedFamily' was omitted due to @Pothos.omit found in schema comment
  // 'events' was omitted due to @Pothos.omit found in schema comment
});
export const GuestCreateWithoutFamilyInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.GuestCreateWithoutFamilyInput>, false>('GuestCreateWithoutFamilyInput').implement({
  fields: GuestCreateWithoutFamilyInputFields,
});

export const GuestCreateOrConnectWithoutFamilyInputFields = (t: any) => ({
  where: t.field({"required":true,"type":GuestWhereUniqueInput}),
  create: t.field({"required":true,"type":GuestCreateWithoutFamilyInput}),
});
export const GuestCreateOrConnectWithoutFamilyInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.GuestCreateOrConnectWithoutFamilyInput>, false>('GuestCreateOrConnectWithoutFamilyInput').implement({
  fields: GuestCreateOrConnectWithoutFamilyInputFields,
});

export const GuestCreateManyFamilyInputEnvelopeFields = (t: any) => ({
  data: t.field({"required":true,"type":[GuestCreateManyFamilyInput]}),
  skipDuplicates: t.boolean({"required":false}),
});
export const GuestCreateManyFamilyInputEnvelope = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.GuestCreateManyFamilyInputEnvelope>, false>('GuestCreateManyFamilyInputEnvelope').implement({
  fields: GuestCreateManyFamilyInputEnvelopeFields,
});

export const GuestUpsertWithoutOwnedFamilyInputFields = (t: any) => ({
  update: t.field({"required":true,"type":GuestUpdateWithoutOwnedFamilyInput}),
  create: t.field({"required":true,"type":GuestCreateWithoutOwnedFamilyInput}),
  where: t.field({"required":false,"type":GuestWhereInput}),
});
export const GuestUpsertWithoutOwnedFamilyInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.GuestUpsertWithoutOwnedFamilyInput>, false>('GuestUpsertWithoutOwnedFamilyInput').implement({
  fields: GuestUpsertWithoutOwnedFamilyInputFields,
});

export const GuestUpdateToOneWithWhereWithoutOwnedFamilyInputFields = (t: any) => ({
  where: t.field({"required":false,"type":GuestWhereInput}),
  data: t.field({"required":true,"type":GuestUpdateWithoutOwnedFamilyInput}),
});
export const GuestUpdateToOneWithWhereWithoutOwnedFamilyInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.GuestUpdateToOneWithWhereWithoutOwnedFamilyInput>, false>('GuestUpdateToOneWithWhereWithoutOwnedFamilyInput').implement({
  fields: GuestUpdateToOneWithWhereWithoutOwnedFamilyInputFields,
});

export const GuestUpdateWithoutOwnedFamilyInputFields = (t: any) => ({
  status: t.field({"required":false,"type":EnumStatusFieldUpdateOperationsInput}),
  email: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  first_name: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  last_name: t.field({"required":false,"type":NullableStringFieldUpdateOperationsInput}),
  side: t.field({"required":false,"type":EnumSideFieldUpdateOperationsInput}),
  type: t.field({"required":false,"type":EnumTypeFieldUpdateOperationsInput}),
  age: t.field({"required":false,"type":EnumAgeFieldUpdateOperationsInput}),
  sex: t.field({"required":false,"type":EnumSexFieldUpdateOperationsInput}),
  table: t.field({"required":false,"type":NullableIntFieldUpdateOperationsInput}),
  transfer: t.field({"required":false,"type":BoolFieldUpdateOperationsInput}),
  accommodation: t.field({"required":false,"type":BoolFieldUpdateOperationsInput}),
  family: t.field({"required":false,"type":FamilyUpdateOneWithoutMembersNestedInput}),
  events: t.field({"required":false,"type":EventUpdateManyWithoutGuestsNestedInput}),
  // 'id' was omitted due to @Pothos.omit found in schema comment
  // 'password' was omitted due to @Pothos.omit found in schema comment
  // 'createdAt' was omitted due to @Pothos.omit found in schema comment
  // 'updatedAt' was omitted due to @Pothos.omit found in schema comment
});
export const GuestUpdateWithoutOwnedFamilyInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.GuestUpdateWithoutOwnedFamilyInput>, false>('GuestUpdateWithoutOwnedFamilyInput').implement({
  fields: GuestUpdateWithoutOwnedFamilyInputFields,
});

export const GuestUpsertWithWhereUniqueWithoutFamilyInputFields = (t: any) => ({
  where: t.field({"required":true,"type":GuestWhereUniqueInput}),
  update: t.field({"required":true,"type":GuestUpdateWithoutFamilyInput}),
  create: t.field({"required":true,"type":GuestCreateWithoutFamilyInput}),
});
export const GuestUpsertWithWhereUniqueWithoutFamilyInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.GuestUpsertWithWhereUniqueWithoutFamilyInput>, false>('GuestUpsertWithWhereUniqueWithoutFamilyInput').implement({
  fields: GuestUpsertWithWhereUniqueWithoutFamilyInputFields,
});

export const GuestUpdateWithWhereUniqueWithoutFamilyInputFields = (t: any) => ({
  where: t.field({"required":true,"type":GuestWhereUniqueInput}),
  data: t.field({"required":true,"type":GuestUpdateWithoutFamilyInput}),
});
export const GuestUpdateWithWhereUniqueWithoutFamilyInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.GuestUpdateWithWhereUniqueWithoutFamilyInput>, false>('GuestUpdateWithWhereUniqueWithoutFamilyInput').implement({
  fields: GuestUpdateWithWhereUniqueWithoutFamilyInputFields,
});

export const GuestUpdateManyWithWhereWithoutFamilyInputFields = (t: any) => ({
  where: t.field({"required":true,"type":GuestScalarWhereInput}),
  data: t.field({"required":true,"type":GuestUpdateManyMutationInput}),
});
export const GuestUpdateManyWithWhereWithoutFamilyInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.GuestUpdateManyWithWhereWithoutFamilyInput>, false>('GuestUpdateManyWithWhereWithoutFamilyInput').implement({
  fields: GuestUpdateManyWithWhereWithoutFamilyInputFields,
});

export const GuestScalarWhereInputFields = (t: any) => ({
  AND: t.field({"required":false,"type":[GuestScalarWhereInput]}),
  OR: t.field({"required":false,"type":[GuestScalarWhereInput]}),
  NOT: t.field({"required":false,"type":[GuestScalarWhereInput]}),
  id: t.field({"required":false,"type":UuidFilter}),
  familyId: t.field({"required":false,"type":UuidNullableFilter}),
  status: t.field({"required":false,"type":EnumStatusFilter}),
  email: t.field({"required":false,"type":StringFilter}),
  first_name: t.field({"required":false,"type":StringFilter}),
  last_name: t.field({"required":false,"type":StringNullableFilter}),
  side: t.field({"required":false,"type":EnumSideFilter}),
  type: t.field({"required":false,"type":EnumTypeFilter}),
  age: t.field({"required":false,"type":EnumAgeFilter}),
  sex: t.field({"required":false,"type":EnumSexFilter}),
  table: t.field({"required":false,"type":IntNullableFilter}),
  transfer: t.field({"required":false,"type":BoolFilter}),
  accommodation: t.field({"required":false,"type":BoolFilter}),
  createdAt: t.field({"required":false,"type":DateTimeFilter}),
  updatedAt: t.field({"required":false,"type":DateTimeFilter}),
  // 'password' was omitted due to @Pothos.omit found in schema comment
});
export const GuestScalarWhereInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.GuestScalarWhereInput>, false>('GuestScalarWhereInput').implement({
  fields: GuestScalarWhereInputFields,
});

export const FamilyCreateWithoutMembersInputFields = (t: any) => ({
  name: t.string({"required":true}),
  owner: t.field({"required":true,"type":GuestCreateNestedOneWithoutOwnedFamilyInput}),
  // 'id' was omitted due to @Pothos.omit found in schema comment
  // 'createdAt' was omitted due to @Pothos.omit found in schema comment
  // 'updatedAt' was omitted due to @Pothos.omit found in schema comment
});
export const FamilyCreateWithoutMembersInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.FamilyCreateWithoutMembersInput>, false>('FamilyCreateWithoutMembersInput').implement({
  fields: FamilyCreateWithoutMembersInputFields,
});

export const FamilyCreateOrConnectWithoutMembersInputFields = (t: any) => ({
  where: t.field({"required":true,"type":FamilyWhereUniqueInput}),
  create: t.field({"required":true,"type":FamilyCreateWithoutMembersInput}),
});
export const FamilyCreateOrConnectWithoutMembersInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.FamilyCreateOrConnectWithoutMembersInput>, false>('FamilyCreateOrConnectWithoutMembersInput').implement({
  fields: FamilyCreateOrConnectWithoutMembersInputFields,
});

export const FamilyCreateWithoutOwnerInputFields = (t: any) => ({
  name: t.string({"required":true}),
  members: t.field({"required":false,"type":GuestCreateNestedManyWithoutFamilyInput}),
  // 'id' was omitted due to @Pothos.omit found in schema comment
  // 'createdAt' was omitted due to @Pothos.omit found in schema comment
  // 'updatedAt' was omitted due to @Pothos.omit found in schema comment
});
export const FamilyCreateWithoutOwnerInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.FamilyCreateWithoutOwnerInput>, false>('FamilyCreateWithoutOwnerInput').implement({
  fields: FamilyCreateWithoutOwnerInputFields,
});

export const FamilyCreateOrConnectWithoutOwnerInputFields = (t: any) => ({
  where: t.field({"required":true,"type":FamilyWhereUniqueInput}),
  create: t.field({"required":true,"type":FamilyCreateWithoutOwnerInput}),
});
export const FamilyCreateOrConnectWithoutOwnerInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.FamilyCreateOrConnectWithoutOwnerInput>, false>('FamilyCreateOrConnectWithoutOwnerInput').implement({
  fields: FamilyCreateOrConnectWithoutOwnerInputFields,
});

export const EventCreateWithoutGuestsInputFields = (t: any) => ({
  index: t.int({"required":true}),
  alias: t.string({"required":true}),
  name: t.string({"required":true}),
  date: t.field({"required":true,"type":DateTime}),
  start: t.field({"required":true,"type":DateTime}),
  end: t.field({"required":true,"type":DateTime}),
  description: t.string({"required":true}),
  address: t.string({"required":false}),
  url: t.string({"required":false}),
  // 'id' was omitted due to @Pothos.omit found in schema comment
  // 'createdAt' was omitted due to @Pothos.omit found in schema comment
  // 'updatedAt' was omitted due to @Pothos.omit found in schema comment
});
export const EventCreateWithoutGuestsInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.EventCreateWithoutGuestsInput>, false>('EventCreateWithoutGuestsInput').implement({
  fields: EventCreateWithoutGuestsInputFields,
});

export const EventCreateOrConnectWithoutGuestsInputFields = (t: any) => ({
  where: t.field({"required":true,"type":EventWhereUniqueInput}),
  create: t.field({"required":true,"type":EventCreateWithoutGuestsInput}),
});
export const EventCreateOrConnectWithoutGuestsInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.EventCreateOrConnectWithoutGuestsInput>, false>('EventCreateOrConnectWithoutGuestsInput').implement({
  fields: EventCreateOrConnectWithoutGuestsInputFields,
});

export const FamilyUpsertWithoutMembersInputFields = (t: any) => ({
  update: t.field({"required":true,"type":FamilyUpdateWithoutMembersInput}),
  create: t.field({"required":true,"type":FamilyCreateWithoutMembersInput}),
  where: t.field({"required":false,"type":FamilyWhereInput}),
});
export const FamilyUpsertWithoutMembersInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.FamilyUpsertWithoutMembersInput>, false>('FamilyUpsertWithoutMembersInput').implement({
  fields: FamilyUpsertWithoutMembersInputFields,
});

export const FamilyUpdateToOneWithWhereWithoutMembersInputFields = (t: any) => ({
  where: t.field({"required":false,"type":FamilyWhereInput}),
  data: t.field({"required":true,"type":FamilyUpdateWithoutMembersInput}),
});
export const FamilyUpdateToOneWithWhereWithoutMembersInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.FamilyUpdateToOneWithWhereWithoutMembersInput>, false>('FamilyUpdateToOneWithWhereWithoutMembersInput').implement({
  fields: FamilyUpdateToOneWithWhereWithoutMembersInputFields,
});

export const FamilyUpdateWithoutMembersInputFields = (t: any) => ({
  name: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  owner: t.field({"required":false,"type":GuestUpdateOneRequiredWithoutOwnedFamilyNestedInput}),
  // 'id' was omitted due to @Pothos.omit found in schema comment
  // 'createdAt' was omitted due to @Pothos.omit found in schema comment
  // 'updatedAt' was omitted due to @Pothos.omit found in schema comment
});
export const FamilyUpdateWithoutMembersInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.FamilyUpdateWithoutMembersInput>, false>('FamilyUpdateWithoutMembersInput').implement({
  fields: FamilyUpdateWithoutMembersInputFields,
});

export const FamilyUpsertWithoutOwnerInputFields = (t: any) => ({
  update: t.field({"required":true,"type":FamilyUpdateWithoutOwnerInput}),
  create: t.field({"required":true,"type":FamilyCreateWithoutOwnerInput}),
  where: t.field({"required":false,"type":FamilyWhereInput}),
});
export const FamilyUpsertWithoutOwnerInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.FamilyUpsertWithoutOwnerInput>, false>('FamilyUpsertWithoutOwnerInput').implement({
  fields: FamilyUpsertWithoutOwnerInputFields,
});

export const FamilyUpdateToOneWithWhereWithoutOwnerInputFields = (t: any) => ({
  where: t.field({"required":false,"type":FamilyWhereInput}),
  data: t.field({"required":true,"type":FamilyUpdateWithoutOwnerInput}),
});
export const FamilyUpdateToOneWithWhereWithoutOwnerInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.FamilyUpdateToOneWithWhereWithoutOwnerInput>, false>('FamilyUpdateToOneWithWhereWithoutOwnerInput').implement({
  fields: FamilyUpdateToOneWithWhereWithoutOwnerInputFields,
});

export const FamilyUpdateWithoutOwnerInputFields = (t: any) => ({
  name: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  members: t.field({"required":false,"type":GuestUpdateManyWithoutFamilyNestedInput}),
  // 'id' was omitted due to @Pothos.omit found in schema comment
  // 'createdAt' was omitted due to @Pothos.omit found in schema comment
  // 'updatedAt' was omitted due to @Pothos.omit found in schema comment
});
export const FamilyUpdateWithoutOwnerInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.FamilyUpdateWithoutOwnerInput>, false>('FamilyUpdateWithoutOwnerInput').implement({
  fields: FamilyUpdateWithoutOwnerInputFields,
});

export const EventUpsertWithWhereUniqueWithoutGuestsInputFields = (t: any) => ({
  where: t.field({"required":true,"type":EventWhereUniqueInput}),
  update: t.field({"required":true,"type":EventUpdateWithoutGuestsInput}),
  create: t.field({"required":true,"type":EventCreateWithoutGuestsInput}),
});
export const EventUpsertWithWhereUniqueWithoutGuestsInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.EventUpsertWithWhereUniqueWithoutGuestsInput>, false>('EventUpsertWithWhereUniqueWithoutGuestsInput').implement({
  fields: EventUpsertWithWhereUniqueWithoutGuestsInputFields,
});

export const EventUpdateWithWhereUniqueWithoutGuestsInputFields = (t: any) => ({
  where: t.field({"required":true,"type":EventWhereUniqueInput}),
  data: t.field({"required":true,"type":EventUpdateWithoutGuestsInput}),
});
export const EventUpdateWithWhereUniqueWithoutGuestsInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.EventUpdateWithWhereUniqueWithoutGuestsInput>, false>('EventUpdateWithWhereUniqueWithoutGuestsInput').implement({
  fields: EventUpdateWithWhereUniqueWithoutGuestsInputFields,
});

export const EventUpdateManyWithWhereWithoutGuestsInputFields = (t: any) => ({
  where: t.field({"required":true,"type":EventScalarWhereInput}),
  data: t.field({"required":true,"type":EventUpdateManyMutationInput}),
});
export const EventUpdateManyWithWhereWithoutGuestsInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.EventUpdateManyWithWhereWithoutGuestsInput>, false>('EventUpdateManyWithWhereWithoutGuestsInput').implement({
  fields: EventUpdateManyWithWhereWithoutGuestsInputFields,
});

export const EventScalarWhereInputFields = (t: any) => ({
  AND: t.field({"required":false,"type":[EventScalarWhereInput]}),
  OR: t.field({"required":false,"type":[EventScalarWhereInput]}),
  NOT: t.field({"required":false,"type":[EventScalarWhereInput]}),
  id: t.field({"required":false,"type":UuidFilter}),
  index: t.field({"required":false,"type":IntFilter}),
  alias: t.field({"required":false,"type":StringFilter}),
  name: t.field({"required":false,"type":StringFilter}),
  date: t.field({"required":false,"type":DateTimeFilter}),
  start: t.field({"required":false,"type":DateTimeFilter}),
  end: t.field({"required":false,"type":DateTimeFilter}),
  description: t.field({"required":false,"type":StringFilter}),
  address: t.field({"required":false,"type":StringNullableFilter}),
  url: t.field({"required":false,"type":StringNullableFilter}),
  createdAt: t.field({"required":false,"type":DateTimeFilter}),
  updatedAt: t.field({"required":false,"type":DateTimeFilter}),
});
export const EventScalarWhereInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.EventScalarWhereInput>, false>('EventScalarWhereInput').implement({
  fields: EventScalarWhereInputFields,
});

export const GuestCreateWithoutEventsInputFields = (t: any) => ({
  status: t.field({"required":false,"type":Status}),
  email: t.string({"required":true}),
  first_name: t.string({"required":true}),
  last_name: t.string({"required":false}),
  side: t.field({"required":true,"type":Side}),
  type: t.field({"required":false,"type":Type}),
  age: t.field({"required":false,"type":Age}),
  sex: t.field({"required":true,"type":Sex}),
  table: t.int({"required":false}),
  transfer: t.boolean({"required":false}),
  accommodation: t.boolean({"required":false}),
  family: t.field({"required":false,"type":FamilyCreateNestedOneWithoutMembersInput}),
  // 'id' was omitted due to @Pothos.omit found in schema comment
  // 'password' was omitted due to @Pothos.omit found in schema comment
  // 'createdAt' was omitted due to @Pothos.omit found in schema comment
  // 'updatedAt' was omitted due to @Pothos.omit found in schema comment
  // 'ownedFamily' was omitted due to @Pothos.omit found in schema comment
});
export const GuestCreateWithoutEventsInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.GuestCreateWithoutEventsInput>, false>('GuestCreateWithoutEventsInput').implement({
  fields: GuestCreateWithoutEventsInputFields,
});

export const GuestCreateOrConnectWithoutEventsInputFields = (t: any) => ({
  where: t.field({"required":true,"type":GuestWhereUniqueInput}),
  create: t.field({"required":true,"type":GuestCreateWithoutEventsInput}),
});
export const GuestCreateOrConnectWithoutEventsInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.GuestCreateOrConnectWithoutEventsInput>, false>('GuestCreateOrConnectWithoutEventsInput').implement({
  fields: GuestCreateOrConnectWithoutEventsInputFields,
});

export const GuestUpsertWithWhereUniqueWithoutEventsInputFields = (t: any) => ({
  where: t.field({"required":true,"type":GuestWhereUniqueInput}),
  update: t.field({"required":true,"type":GuestUpdateWithoutEventsInput}),
  create: t.field({"required":true,"type":GuestCreateWithoutEventsInput}),
});
export const GuestUpsertWithWhereUniqueWithoutEventsInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.GuestUpsertWithWhereUniqueWithoutEventsInput>, false>('GuestUpsertWithWhereUniqueWithoutEventsInput').implement({
  fields: GuestUpsertWithWhereUniqueWithoutEventsInputFields,
});

export const GuestUpdateWithWhereUniqueWithoutEventsInputFields = (t: any) => ({
  where: t.field({"required":true,"type":GuestWhereUniqueInput}),
  data: t.field({"required":true,"type":GuestUpdateWithoutEventsInput}),
});
export const GuestUpdateWithWhereUniqueWithoutEventsInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.GuestUpdateWithWhereUniqueWithoutEventsInput>, false>('GuestUpdateWithWhereUniqueWithoutEventsInput').implement({
  fields: GuestUpdateWithWhereUniqueWithoutEventsInputFields,
});

export const GuestUpdateManyWithWhereWithoutEventsInputFields = (t: any) => ({
  where: t.field({"required":true,"type":GuestScalarWhereInput}),
  data: t.field({"required":true,"type":GuestUpdateManyMutationInput}),
});
export const GuestUpdateManyWithWhereWithoutEventsInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.GuestUpdateManyWithWhereWithoutEventsInput>, false>('GuestUpdateManyWithWhereWithoutEventsInput').implement({
  fields: GuestUpdateManyWithWhereWithoutEventsInputFields,
});

export const GuestCreateManyFamilyInputFields = (t: any) => ({
  status: t.field({"required":false,"type":Status}),
  email: t.string({"required":true}),
  first_name: t.string({"required":true}),
  last_name: t.string({"required":false}),
  side: t.field({"required":true,"type":Side}),
  type: t.field({"required":false,"type":Type}),
  age: t.field({"required":false,"type":Age}),
  sex: t.field({"required":true,"type":Sex}),
  table: t.int({"required":false}),
  transfer: t.boolean({"required":false}),
  accommodation: t.boolean({"required":false}),
  // 'id' was omitted due to @Pothos.omit found in schema comment
  // 'password' was omitted due to @Pothos.omit found in schema comment
  // 'createdAt' was omitted due to @Pothos.omit found in schema comment
  // 'updatedAt' was omitted due to @Pothos.omit found in schema comment
});
export const GuestCreateManyFamilyInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.GuestCreateManyFamilyInput>, false>('GuestCreateManyFamilyInput').implement({
  fields: GuestCreateManyFamilyInputFields,
});

export const GuestUpdateWithoutFamilyInputFields = (t: any) => ({
  status: t.field({"required":false,"type":EnumStatusFieldUpdateOperationsInput}),
  email: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  first_name: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  last_name: t.field({"required":false,"type":NullableStringFieldUpdateOperationsInput}),
  side: t.field({"required":false,"type":EnumSideFieldUpdateOperationsInput}),
  type: t.field({"required":false,"type":EnumTypeFieldUpdateOperationsInput}),
  age: t.field({"required":false,"type":EnumAgeFieldUpdateOperationsInput}),
  sex: t.field({"required":false,"type":EnumSexFieldUpdateOperationsInput}),
  table: t.field({"required":false,"type":NullableIntFieldUpdateOperationsInput}),
  transfer: t.field({"required":false,"type":BoolFieldUpdateOperationsInput}),
  accommodation: t.field({"required":false,"type":BoolFieldUpdateOperationsInput}),
  ownedFamily: t.field({"required":false,"type":FamilyUpdateOneWithoutOwnerNestedInput}),
  events: t.field({"required":false,"type":EventUpdateManyWithoutGuestsNestedInput}),
  // 'id' was omitted due to @Pothos.omit found in schema comment
  // 'password' was omitted due to @Pothos.omit found in schema comment
  // 'createdAt' was omitted due to @Pothos.omit found in schema comment
  // 'updatedAt' was omitted due to @Pothos.omit found in schema comment
});
export const GuestUpdateWithoutFamilyInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.GuestUpdateWithoutFamilyInput>, false>('GuestUpdateWithoutFamilyInput').implement({
  fields: GuestUpdateWithoutFamilyInputFields,
});

export const EventUpdateWithoutGuestsInputFields = (t: any) => ({
  index: t.field({"required":false,"type":IntFieldUpdateOperationsInput}),
  alias: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  name: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  date: t.field({"required":false,"type":DateTimeFieldUpdateOperationsInput}),
  start: t.field({"required":false,"type":DateTimeFieldUpdateOperationsInput}),
  end: t.field({"required":false,"type":DateTimeFieldUpdateOperationsInput}),
  description: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  address: t.field({"required":false,"type":NullableStringFieldUpdateOperationsInput}),
  url: t.field({"required":false,"type":NullableStringFieldUpdateOperationsInput}),
  // 'id' was omitted due to @Pothos.omit found in schema comment
  // 'createdAt' was omitted due to @Pothos.omit found in schema comment
  // 'updatedAt' was omitted due to @Pothos.omit found in schema comment
});
export const EventUpdateWithoutGuestsInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.EventUpdateWithoutGuestsInput>, false>('EventUpdateWithoutGuestsInput').implement({
  fields: EventUpdateWithoutGuestsInputFields,
});

export const GuestUpdateWithoutEventsInputFields = (t: any) => ({
  status: t.field({"required":false,"type":EnumStatusFieldUpdateOperationsInput}),
  email: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  first_name: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  last_name: t.field({"required":false,"type":NullableStringFieldUpdateOperationsInput}),
  side: t.field({"required":false,"type":EnumSideFieldUpdateOperationsInput}),
  type: t.field({"required":false,"type":EnumTypeFieldUpdateOperationsInput}),
  age: t.field({"required":false,"type":EnumAgeFieldUpdateOperationsInput}),
  sex: t.field({"required":false,"type":EnumSexFieldUpdateOperationsInput}),
  table: t.field({"required":false,"type":NullableIntFieldUpdateOperationsInput}),
  transfer: t.field({"required":false,"type":BoolFieldUpdateOperationsInput}),
  accommodation: t.field({"required":false,"type":BoolFieldUpdateOperationsInput}),
  family: t.field({"required":false,"type":FamilyUpdateOneWithoutMembersNestedInput}),
  ownedFamily: t.field({"required":false,"type":FamilyUpdateOneWithoutOwnerNestedInput}),
  // 'id' was omitted due to @Pothos.omit found in schema comment
  // 'password' was omitted due to @Pothos.omit found in schema comment
  // 'createdAt' was omitted due to @Pothos.omit found in schema comment
  // 'updatedAt' was omitted due to @Pothos.omit found in schema comment
});
export const GuestUpdateWithoutEventsInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.GuestUpdateWithoutEventsInput>, false>('GuestUpdateWithoutEventsInput').implement({
  fields: GuestUpdateWithoutEventsInputFields,
});