export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'createchannel' : IDL.Func(
        [IDL.Record({ 'username' : IDL.Text, 'nameofchannel' : IDL.Text })],
        [
          IDL.Variant({
            'Ok' : IDL.Text,
            'Err' : IDL.Variant({
              'NoMessageWithSuchId' : IDL.Text,
              'NotAMemberOfGroup' : IDL.Text,
              'channelAlreadyExist' : IDL.Text,
              'credentialsMissing' : IDL.Text,
              'usernameIsRequired' : IDL.Text,
              'onlyOwnerCanDelete' : IDL.Text,
              'GroupNameIsRequired' : IDL.Text,
              'userNameAlreadyExist' : IDL.Text,
              'EnterCorrectDetais' : IDL.Text,
              'channelDoesNotExist' : IDL.Text,
              'UserDoesNotExist' : IDL.Text,
              'ErrorWhenExitingGropu' : IDL.Text,
              'AlreadyAmember' : IDL.Text,
            }),
          }),
        ],
        [],
      ),
    'deletechannel' : IDL.Func(
        [IDL.Record({ 'owner' : IDL.Principal, 'nameofchannel' : IDL.Text })],
        [
          IDL.Variant({
            'Ok' : IDL.Text,
            'Err' : IDL.Variant({
              'NoMessageWithSuchId' : IDL.Text,
              'NotAMemberOfGroup' : IDL.Text,
              'channelAlreadyExist' : IDL.Text,
              'credentialsMissing' : IDL.Text,
              'usernameIsRequired' : IDL.Text,
              'onlyOwnerCanDelete' : IDL.Text,
              'GroupNameIsRequired' : IDL.Text,
              'userNameAlreadyExist' : IDL.Text,
              'EnterCorrectDetais' : IDL.Text,
              'channelDoesNotExist' : IDL.Text,
              'UserDoesNotExist' : IDL.Text,
              'ErrorWhenExitingGropu' : IDL.Text,
              'AlreadyAmember' : IDL.Text,
            }),
          }),
        ],
        [],
      ),
    'followchannel' : IDL.Func(
        [IDL.Record({ 'username' : IDL.Text, 'nameofchannel' : IDL.Text })],
        [IDL.Text],
        [],
      ),
    'getAllChannels' : IDL.Func(
        [],
        [
          IDL.Vec(
            IDL.Record({
              'owner' : IDL.Principal,
              'name' : IDL.Text,
              'news' : IDL.Vec(
                IDL.Record({
                  'id' : IDL.Principal,
                  'title' : IDL.Text,
                  'description' : IDL.Text,
                  'replies' : IDL.Vec(
                    IDL.Record({
                      'by' : IDL.Principal,
                      'newsid' : IDL.Principal,
                      'reply' : IDL.Text,
                    })
                  ),
                })
              ),
              'followers' : IDL.Vec(IDL.Text),
            })
          ),
        ],
        ['query'],
      ),
    'get_news' : IDL.Func(
        [IDL.Record({ 'channelname' : IDL.Text })],
        [
          IDL.Variant({
            'Ok' : IDL.Vec(
              IDL.Record({
                'id' : IDL.Principal,
                'title' : IDL.Text,
                'description' : IDL.Text,
                'replies' : IDL.Vec(
                  IDL.Record({
                    'by' : IDL.Principal,
                    'newsid' : IDL.Principal,
                    'reply' : IDL.Text,
                  })
                ),
              })
            ),
            'Err' : IDL.Variant({
              'NoMessageWithSuchId' : IDL.Text,
              'NotAMemberOfGroup' : IDL.Text,
              'channelAlreadyExist' : IDL.Text,
              'credentialsMissing' : IDL.Text,
              'usernameIsRequired' : IDL.Text,
              'onlyOwnerCanDelete' : IDL.Text,
              'GroupNameIsRequired' : IDL.Text,
              'userNameAlreadyExist' : IDL.Text,
              'EnterCorrectDetais' : IDL.Text,
              'channelDoesNotExist' : IDL.Text,
              'UserDoesNotExist' : IDL.Text,
              'ErrorWhenExitingGropu' : IDL.Text,
              'AlreadyAmember' : IDL.Text,
            }),
          }),
        ],
        ['query'],
      ),
    'postnews' : IDL.Func(
        [
          IDL.Record({
            'title' : IDL.Text,
            'channelname' : IDL.Text,
            'owner' : IDL.Principal,
            'description' : IDL.Text,
          }),
        ],
        [IDL.Text],
        [],
      ),
    'registerUser' : IDL.Func(
        [IDL.Record({ 'username' : IDL.Text })],
        [
          IDL.Variant({
            'Ok' : IDL.Text,
            'Err' : IDL.Variant({
              'NoMessageWithSuchId' : IDL.Text,
              'NotAMemberOfGroup' : IDL.Text,
              'channelAlreadyExist' : IDL.Text,
              'credentialsMissing' : IDL.Text,
              'usernameIsRequired' : IDL.Text,
              'onlyOwnerCanDelete' : IDL.Text,
              'GroupNameIsRequired' : IDL.Text,
              'userNameAlreadyExist' : IDL.Text,
              'EnterCorrectDetais' : IDL.Text,
              'channelDoesNotExist' : IDL.Text,
              'UserDoesNotExist' : IDL.Text,
              'ErrorWhenExitingGropu' : IDL.Text,
              'AlreadyAmember' : IDL.Text,
            }),
          }),
        ],
        [],
      ),
    'reply_to_news' : IDL.Func(
        [
          IDL.Record({
            'username' : IDL.Text,
            'channelname' : IDL.Text,
            'newsid' : IDL.Principal,
            'reply' : IDL.Text,
          }),
        ],
        [IDL.Text],
        [],
      ),
    'unfollowchannel' : IDL.Func(
        [IDL.Record({ 'username' : IDL.Text, 'nameofchannel' : IDL.Text })],
        [IDL.Text],
        [],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
