export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Byte` scalar type represents byte value as a Buffer */
  Bytes: any;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  Json: any;
};

export type Mutation = {
  __typename?: "Mutation";
  login?: Maybe<User>;
  logout?: Maybe<User>;
  register?: Maybe<User>;
};

export type MutationLoginArgs = {
  name: Scalars["String"];
  password: Scalars["String"];
};

export type MutationRegisterArgs = {
  name: Scalars["String"];
  password: Scalars["String"];
};

export type Query = {
  __typename?: "Query";
  hello?: Maybe<Scalars["String"]>;
  me?: Maybe<User>;
  random?: Maybe<Scalars["Int"]>;
};

export type User = {
  __typename?: "User";
  createdAt: Scalars["DateTime"];
  id: Scalars["Int"];
  name: Scalars["String"];
  password: Scalars["String"];
};
