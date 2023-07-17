/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type CreateItemInput = {
  /** Key */
  key: Scalars['String']['input'];
  /** Value */
  value: Scalars['String']['input'];
};

export type CreateProfileInput = {
  /** Color */
  cor: Scalars['String']['input'];
  /** Description */
  description: Scalars['String']['input'];
  /** Name */
  name: Scalars['String']['input'];
  /** Slug */
  slug: Scalars['String']['input'];
};

export type CreateUserInput = {
  /** Password */
  password: Scalars['String']['input'];
  /** Username */
  username: Scalars['String']['input'];
};

export type Item = {
  __typename?: 'Item';
  /** active */
  active?: Maybe<Scalars['Boolean']['output']>;
  /** ID */
  id: Scalars['String']['output'];
  /** Key */
  key: Scalars['String']['output'];
  /** Value */
  value: Scalars['String']['output'];
};

export type Login = {
  __typename?: 'Login';
  access_token: Scalars['String']['output'];
  refresh_token: Scalars['String']['output'];
  user: User;
};

export type LoginAuthInput = {
  /** Password */
  password: Scalars['String']['input'];
  /** Username */
  username: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createItem: Item;
  createProfile: Profile;
  login?: Maybe<Login>;
  refreshToken: Login;
  register: Login;
  removeItem: Item;
  removeProfile: Profile;
  updateItem: Item;
  updateProfile: Profile;
};


export type MutationCreateItemArgs = {
  createItemInput: CreateItemInput;
};


export type MutationCreateProfileArgs = {
  createProfileInput: CreateProfileInput;
};


export type MutationLoginArgs = {
  login: LoginAuthInput;
};


export type MutationRefreshTokenArgs = {
  login: RefreshTokenAuthInput;
};


export type MutationRegisterArgs = {
  register: CreateUserInput;
};


export type MutationRemoveItemArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveProfileArgs = {
  id: Scalars['Int']['input'];
};


export type MutationUpdateItemArgs = {
  updateItemInput: UpdateItemInput;
};


export type MutationUpdateProfileArgs = {
  updateProfileInput: UpdateProfileInput;
};

export type Profile = {
  __typename?: 'Profile';
  /** Cor */
  cor?: Maybe<Scalars['String']['output']>;
  /** Description */
  description?: Maybe<Scalars['String']['output']>;
  /** ID */
  id: Scalars['String']['output'];
  /** Image */
  image?: Maybe<Scalars['String']['output']>;
  /** Name */
  name: Scalars['String']['output'];
  /** slug */
  slug: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  currentUser?: Maybe<User>;
  item: Item;
  profile?: Maybe<Profile>;
  user?: Maybe<User>;
};


export type QueryItemArgs = {
  id: Scalars['Int']['input'];
};


export type QueryUserArgs = {
  username: Scalars['String']['input'];
};

export type RefreshTokenAuthInput = {
  /** Password */
  password: Scalars['Int']['input'];
  /** Username */
  username: Scalars['Int']['input'];
};

export type UpdateItemInput = {
  /** active */
  active?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['String']['input'];
  /** Key */
  key?: InputMaybe<Scalars['String']['input']>;
  /** Value */
  value?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateProfileInput = {
  /** Color */
  cor?: InputMaybe<Scalars['String']['input']>;
  /** Description */
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  /** Name */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Slug */
  slug?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['String']['output'];
  password: Scalars['String']['output'];
  username: Scalars['String']['output'];
};
