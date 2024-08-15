/* eslint-disable */
import type { Prisma, Family, Guest, Event } from "@prisma/client";
export default interface PrismaTypes {
    Family: {
        Name: "Family";
        Shape: Family;
        Include: Prisma.FamilyInclude;
        Select: Prisma.FamilySelect;
        OrderBy: Prisma.FamilyOrderByWithRelationInput;
        WhereUnique: Prisma.FamilyWhereUniqueInput;
        Where: Prisma.FamilyWhereInput;
        Create: Prisma.FamilyCreateInput;
        Update: Prisma.FamilyUpdateInput;
        RelationName: "owner" | "members";
        ListRelations: "members";
        Relations: {
            owner: {
                Shape: Guest;
                Name: "Guest";
                Nullable: false;
            };
            members: {
                Shape: Guest[];
                Name: "Guest";
                Nullable: false;
            };
        };
    };
    Guest: {
        Name: "Guest";
        Shape: Guest;
        Include: Prisma.GuestInclude;
        Select: Prisma.GuestSelect;
        OrderBy: Prisma.GuestOrderByWithRelationInput;
        WhereUnique: Prisma.GuestWhereUniqueInput;
        Where: Prisma.GuestWhereInput;
        Create: Prisma.GuestCreateInput;
        Update: Prisma.GuestUpdateInput;
        RelationName: "family" | "ownedFamily" | "events";
        ListRelations: "events";
        Relations: {
            family: {
                Shape: Family | null;
                Name: "Family";
                Nullable: true;
            };
            ownedFamily: {
                Shape: Family | null;
                Name: "Family";
                Nullable: true;
            };
            events: {
                Shape: Event[];
                Name: "Event";
                Nullable: false;
            };
        };
    };
    Event: {
        Name: "Event";
        Shape: Event;
        Include: Prisma.EventInclude;
        Select: Prisma.EventSelect;
        OrderBy: Prisma.EventOrderByWithRelationInput;
        WhereUnique: Prisma.EventWhereUniqueInput;
        Where: Prisma.EventWhereInput;
        Create: Prisma.EventCreateInput;
        Update: Prisma.EventUpdateInput;
        RelationName: "guests";
        ListRelations: "guests";
        Relations: {
            guests: {
                Shape: Guest[];
                Name: "Guest";
                Nullable: false;
            };
        };
    };
}