export const proposalHeaders = ['Key', 'Title', 'Status', 'Voting Start', 'Voting End', ''];

export const votesHeaders = ['Height', 'Timestamp', 'Account', 'Hash', 'Vote', 'Status'];

export const rows = [
  {
    key: '1',
    category: 'Core',
    title: 'Nomadland',
    status: 'Completed',
    votingStart: 1678881600000,
    votingEnd: 1704067200000,
    resultsLink: 'https://www.oscars.org/oscars/ceremonies/2021'
  },
  {
    key: '2',
    category: 'Best Actor',
    title: 'Anthony Hopkins',
    status: 'In Progress',
    votingStart: 1656927000000,
    votingEnd: 1703529900000,
    resultsLink: 'https://www.oscars.org/oscars/ceremonies/2021'
  },
  {
    key: '3',
    category: 'Best Actress',
    title: 'Frances McDormand',
    status: 'Completed',
    votingStart: 1678881600000,
    votingEnd: 1704067200000,
    resultsLink: 'https://www.oscars.org/oscars/ceremonies/2021'
  },
  {
    key: '4',
    category: 'Best Director',
    title: 'Chloé Zhao',
    status: 'In Review',
    votingStart: 1656927000000,
    votingEnd: 1703529900000,
    resultsLink: 'https://www.oscars.org/oscars/ceremonies/2021'
  },
  {
    key: '5',
    category: 'Best Original Screenplay',
    title: 'Promising Young Woman',
    status: 'Pending',
    votingStart: 1688889600000,
    votingEnd: 1714075200000,
    resultsLink: 'https://www.oscars.org/oscars/ceremonies/2021'
  },
  {
    key: '6',
    category: 'Best Adapted Screenplay',
    title: 'The Father',
    status: 'In Progress',
    votingStart: 1666927000000,
    votingEnd: 1703529900000,
    resultsLink: 'https://www.oscars.org/oscars/ceremonies/2021'
  },
  {
    key: '7',
    category: 'Best Cinematography',
    title: 'Mank',
    status: 'In Review',
    votingStart: 1656927000000,
    votingEnd: 1703529900000,
    resultsLink: 'https://www.oscars.org/oscars/ceremonies/2021'
  },
  {
    key: '8',
    category: 'Best Editing',
    title: 'Sound of Metal',
    status: 'Completed',
    votingStart: 1678881600000,
    votingEnd: 1704067200000,
    resultsLink: 'https://www.oscars.org/oscars/ceremonies/2021'
  },
  {
    key: '9',
    category: 'Best Visual Effects',
    title: 'Tenet',
    status: 'Pending',
    votingStart: 1688889600000,
    votingEnd: 1714075200000,
    resultsLink: 'https://www.oscars.org/oscars/ceremonies/2021'
  },
  {
    key: '10',
    category: 'Best Production Design',
    title: 'The Father',
    status: 'In Progress',
    votingStart: 1666927000000,
    votingEnd: 1703529900000,
    resultsLink: 'https://www.oscars.org/oscars/ceremonies/2021'
  },
  {
    key: '11',
    category: 'Best Costume Design',
    title: "Ma Rainey's Black Bottom",
    status: 'In Review',
    votingStart: 1656927000000,
    votingEnd: 1703529900000,
    resultsLink: 'https://www.oscars.org/oscars/ceremonies/2021'
  },
  {
    key: '12',
    category: 'Best Production Design',
    title: 'The Father',
    status: 'In Progress',
    votingStart: 1666927000000,
    votingEnd: 1703529900000,
    resultsLink: 'https://www.oscars.org/oscars/ceremonies/2021'
  },
  {
    key: '13',
    category: 'Best Picture',
    title: 'No Country For Old Men',
    status: 'Completed',
    votingStart: 1656927000000,
    votingEnd: 1703529900000,
    resultsLink: 'https://www.oscars.org/oscars/ceremonies/2021'
  }
];

// export a type of type row
export type FakeDataRow = (typeof rows)[0];

export const votes = [
  {
    Height: 255340,
    Timestamp: 1685257920000,
    Account: 'B62qcc3XYlKVKeFYgZEdDBBBdjPLP0euc0UDXt5',
    Hash: '1Oey07AJwMRM99WWod7WdpxUPEUiKfo13MbDFhrU',
    Vote: 'AGAINST',
    Status: 'Orphaned'
  },
  {
    Height: 255408,
    Timestamp: 1685271960000,
    Account: 'B62qGQWCCG65DyppcdEeYmdh26oLSAASi7PGzSM',
    Hash: '53pdVmvX8ZSBNNj1DlfwWEfHBkBgExvMexLj6VKu',
    Vote: 'AGAINST',
    Status: 'Pending'
  },
  {
    Height: 255353,
    Timestamp: 1685238480000,
    Account: 'B62qHKk2fpxKKxn4jlEt61x34XnInz2RSRabt3c',
    Hash: 'XLptd095V6DQtEhC7yw54ENeV7so8lFAs5p7fFV5',
    Vote: 'FOR',
    Status: 'Canonical'
  },
  {
    Height: 255483,
    Timestamp: 1685261700000,
    Account: 'B62qPBGZ0TDonCEyqZZkkeYf0tdZfjJv2sdF2l2',
    Hash: 'PhFQRbKEVkhxGoqGfWqqkkXiHVMX6IuEq9URtRyH',
    Vote: 'AGAINST',
    Status: 'Orphaned'
  },
  {
    Height: 255340,
    Timestamp: 1685257920000,
    Account: 'B62qcc3XYlKVKeFYgZEdDBBBdjPLP0euc0UDXt5',
    Hash: '1Oey07AJwMRM99WWod7WdpxUPEUiKfo13MbDFhrU',
    Vote: 'AGAINST',
    Status: 'Orphaned'
  },
  {
    Height: 255408,
    Timestamp: 1685271960000,
    Account: 'B62qGQWCCG65DyppcdEeYmdh26oLSAASi7PGzSM',
    Hash: '53pdVmvX8ZSBNNj1DlfwWEfHBkBgExvMexLj6VKu',
    Vote: 'AGAINST',
    Status: 'Pending'
  },
  {
    Height: 255353,
    Timestamp: 1685238480000,
    Account: 'B62qHKk2fpxKKxn4jlEt61x34XnInz2RSRabt3c',
    Hash: 'XLptd095V6DQtEhC7yw54ENeV7so8lFAs5p7fFV5',
    Vote: 'FOR',
    Status: 'Canonical'
  },
  {
    Height: 255483,
    Timestamp: 1685261700000,
    Account: 'B62qPBGZ0TDonCEyqZZkkeYf0tdZfjJv2sdF2l2',
    Hash: 'PhFQRbKEVkhxGoqGfWqqkkXiHVMX6IuEq9URtRyH',
    Vote: 'AGAINST',
    Status: 'Pending'
  }
];

export type RowType = typeof rows;
export type VotesType = typeof votes;