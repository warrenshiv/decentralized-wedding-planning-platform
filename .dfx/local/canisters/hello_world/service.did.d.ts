import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface _SERVICE {
  'createchannel' : ActorMethod<
    [{ 'username' : string, 'nameofchannel' : string }],
    { 'Ok' : string } |
      {
        'Err' : { 'NoMessageWithSuchId' : string } |
          { 'NotAMemberOfGroup' : string } |
          { 'channelAlreadyExist' : string } |
          { 'credentialsMissing' : string } |
          { 'usernameIsRequired' : string } |
          { 'onlyOwnerCanDelete' : string } |
          { 'GroupNameIsRequired' : string } |
          { 'userNameAlreadyExist' : string } |
          { 'EnterCorrectDetais' : string } |
          { 'channelDoesNotExist' : string } |
          { 'UserDoesNotExist' : string } |
          { 'ErrorWhenExitingGropu' : string } |
          { 'AlreadyAmember' : string }
      }
  >,
  'deletechannel' : ActorMethod<
    [{ 'owner' : Principal, 'nameofchannel' : string }],
    { 'Ok' : string } |
      {
        'Err' : { 'NoMessageWithSuchId' : string } |
          { 'NotAMemberOfGroup' : string } |
          { 'channelAlreadyExist' : string } |
          { 'credentialsMissing' : string } |
          { 'usernameIsRequired' : string } |
          { 'onlyOwnerCanDelete' : string } |
          { 'GroupNameIsRequired' : string } |
          { 'userNameAlreadyExist' : string } |
          { 'EnterCorrectDetais' : string } |
          { 'channelDoesNotExist' : string } |
          { 'UserDoesNotExist' : string } |
          { 'ErrorWhenExitingGropu' : string } |
          { 'AlreadyAmember' : string }
      }
  >,
  'followchannel' : ActorMethod<
    [{ 'username' : string, 'nameofchannel' : string }],
    string
  >,
  'getAllChannels' : ActorMethod<
    [],
    Array<
      {
        'owner' : Principal,
        'name' : string,
        'news' : Array<
          {
            'id' : Principal,
            'title' : string,
            'description' : string,
            'replies' : Array<
              { 'by' : Principal, 'newsid' : Principal, 'reply' : string }
            >,
          }
        >,
        'followers' : Array<string>,
      }
    >
  >,
  'get_news' : ActorMethod<
    [{ 'channelname' : string }],
    {
        'Ok' : Array<
          {
            'id' : Principal,
            'title' : string,
            'description' : string,
            'replies' : Array<
              { 'by' : Principal, 'newsid' : Principal, 'reply' : string }
            >,
          }
        >
      } |
      {
        'Err' : { 'NoMessageWithSuchId' : string } |
          { 'NotAMemberOfGroup' : string } |
          { 'channelAlreadyExist' : string } |
          { 'credentialsMissing' : string } |
          { 'usernameIsRequired' : string } |
          { 'onlyOwnerCanDelete' : string } |
          { 'GroupNameIsRequired' : string } |
          { 'userNameAlreadyExist' : string } |
          { 'EnterCorrectDetais' : string } |
          { 'channelDoesNotExist' : string } |
          { 'UserDoesNotExist' : string } |
          { 'ErrorWhenExitingGropu' : string } |
          { 'AlreadyAmember' : string }
      }
  >,
  'postnews' : ActorMethod<
    [
      {
        'title' : string,
        'channelname' : string,
        'owner' : Principal,
        'description' : string,
      },
    ],
    string
  >,
  'registerUser' : ActorMethod<
    [{ 'username' : string }],
    { 'Ok' : string } |
      {
        'Err' : { 'NoMessageWithSuchId' : string } |
          { 'NotAMemberOfGroup' : string } |
          { 'channelAlreadyExist' : string } |
          { 'credentialsMissing' : string } |
          { 'usernameIsRequired' : string } |
          { 'onlyOwnerCanDelete' : string } |
          { 'GroupNameIsRequired' : string } |
          { 'userNameAlreadyExist' : string } |
          { 'EnterCorrectDetais' : string } |
          { 'channelDoesNotExist' : string } |
          { 'UserDoesNotExist' : string } |
          { 'ErrorWhenExitingGropu' : string } |
          { 'AlreadyAmember' : string }
      }
  >,
  'reply_to_news' : ActorMethod<
    [
      {
        'username' : string,
        'channelname' : string,
        'newsid' : Principal,
        'reply' : string,
      },
    ],
    string
  >,
  'unfollowchannel' : ActorMethod<
    [{ 'username' : string, 'nameofchannel' : string }],
    string
  >,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
