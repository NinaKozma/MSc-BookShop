const products = [
  {
    title: 'To kill a mocking bird',
    description:
      "Harper Lee's Pulitzer Prize-winning masterwork of honor and injustice in the deep South--and the heroism of one man in the face of blind and violent hatred",
    price: 1299.0,
    numberOfPages: 320,
    language: 'english',
    countInStock: 10,
    rating: 4.5,
    numReviews: 12,
    image: '/images/to_kill_a_mockingbird_vv.jpg',
    writer: '6065d9835ba0cf0e284aa071',
    genre: '6065d9835ba0cf0e284aa067',
    publisher: '6065d9835ba0cf0e284aa06a',
    supplier: '6065d9835ba0cf0e284aa07b',
  },
  {
    title: 'Picture of Dorian Gray',
    description:
      "Wilde's only novel, first published in 1890, is a brilliantly designed puzzle, intended to tease conventional minds with its exploration of the myriad interrelationships between art, life, and consequence.",
    price: 799.0,
    numberOfPages: 189,
    language: 'english',
    countInStock: 8,
    rating: 4,
    numReviews: 9,
    image: '/images/picture_of_dorian_gray_vv.jpg',
    writer: '6065d9835ba0cf0e284aa072',
    genre: '6065d9835ba0cf0e284aa060',
    publisher: '6065d9835ba0cf0e284aa06e',
    supplier: '6065d9835ba0cf0e284aa07b',
  },
  {
    title: 'The Old Man and The Sea',
    description:
      "It was The Old Man and the Sea that won for Hemingway the Nobel Prize for Literature. Here, in a perfectly crafted story, is a unique and timeless vision of the beauty and grief of man's challenge to the elements in which he lives.",
    price: 1159.0,
    numberOfPages: 124,
    language: 'english',
    countInStock: 5,
    rating: 3,
    numReviews: 12,
    image: '/images/the_old_man_and_the_sea_vv.jpg',
    writer: '6065d9835ba0cf0e284aa070',
    genre: '6065d9835ba0cf0e284aa060',
    publisher: '6065d9835ba0cf0e284aa06d',
    supplier: '6065d9835ba0cf0e284aa07b',
  },
  {
    title: 'Moby Dick',
    description:
      "When the young Ishmael gets on board Captain Ahab's whaling ship, little does he suspect that the mission on which he is about to embark is the fulfilment of his master's obsessive desire for revenge on Moby Dick, a white whale who has already claimed countless human victims and destroyed many fleets.",
    price: 955.41,
    numberOfPages: 458,
    language: 'english',
    countInStock: 11,
    rating: 5,
    numReviews: 12,
    image: '/images/moby_dick_vv.jpg',
    writer: '6065d9835ba0cf0e284aa074',
    genre: '6065d9835ba0cf0e284aa066',
    publisher: '6065d9835ba0cf0e284aa06d',
    supplier: '6065d9835ba0cf0e284aa07c',
  },
  {
    title: 'Oliver Twist',
    description:
      '"An unforgettable journey into criminal behaviour that takes me back to my own childhood fantasies" (Malcolm McLaren)',
    price: 849.0,
    numberOfPages: 352,
    language: 'english',
    countInStock: 7,
    rating: 3.5,
    numReviews: 10,
    image: '/images/oliver_twist_vv.jpg',
    writer: '6065d9835ba0cf0e284aa073',
    genre: '6065d9835ba0cf0e284aa060',
    publisher: '6065d9835ba0cf0e284aa06d',
    supplier: '6065d9835ba0cf0e284aa07c',
  },
  {
    title: 'Crime and Punishment',
    description:
      'Crime and Punishment is one of the greatest and most readable novels ever written. From the beginning we are locked into the frenzied consciousness of Raskolnikov who, against his better instincts, is inexorably drawn to commit a brutal double murder.',
    price: 1099.0,
    numberOfPages: 502,
    language: 'english',
    countInStock: 0,
    rating: 4,
    numReviews: 12,
    image: '/images/crime_and_punishment_vv.jpg',
    writer: '6065d9835ba0cf0e284aa06f',
    genre: '6065d9835ba0cf0e284aa060',
    publisher: '6065d9835ba0cf0e284aa06d',
    supplier: '6065d9835ba0cf0e284aa07c',
  },
  {
    title: "Harry Potter and the Philopher's stone",
    description:
      "Harry Potter has never even heard of Hogwarts when the letters start dropping on the doormat at number four, Privet Drive. Addressed in green ink on yellowish parchment with a purple seal, they are swiftly confiscated by his grisly aunt and uncle. Then, on Harry's eleventh birthday, a great beetle-eyed giant of a man called Rubeus Hagrid bursts in with some astonishing news: Harry Potter is a wizard, and he has a place at Hogwarts School of Witchcraft and Wizardry. An incredible adventure is about to begin!",
    price: 1159.0,
    numberOfPages: 352,
    language: 'english',
    countInStock: 5,
    rating: 4.2,
    numReviews: 6,
    image: '/images/275585_600_600px.jpg',
    writer: '6065d9835ba0cf0e284aa07a',
    genre: '6065d9835ba0cf0e284aa062',
    publisher: '6065d9835ba0cf0e284aa06a',
    supplier: '6065d9835ba0cf0e284aa07d',
  },
  {
    title: 'Pride and Prejudice',
    description:
      'The pride of high-ranking Mr Darcy and the prejudice of middle-class Elizabeth Bennet conduct an absorbing dance through the rigid social hierarchies of early-nineteenth-century England, with the passion of the two unlikely lovers growing as their union seems ever more improbable.',
    price: 899.0,
    numberOfPages: 300,
    language: 'english',
    countInStock: 7,
    rating: 4.5,
    numReviews: 8,
    image: '/images/325099_600_600px.jpg',
    writer: '6065d9835ba0cf0e284aa075',
    genre: '6065d9835ba0cf0e284aa065',
    publisher: '6065d9835ba0cf0e284aa06b',
    supplier: '6065d9835ba0cf0e284aa07d',
  },
  {
    title: 'Jane Eyre',
    description:
      'So we open Jane Eyre... The writer has us by the hand, forces us along her road, makes us see what she sees, never leaves us for a moment or allows us to forget her. At the end we are steeped through and through with the genius, the vehemence, the indignation of Charlotte Brontë...',
    price: 999.0,
    numberOfPages: 404,
    language: 'english',
    countInStock: 4,
    rating: 4.1,
    numReviews: 3,
    image: '/images/jane_eyre.jpg',
    writer: '6065d9835ba0cf0e284aa076',
    genre: '6065d9835ba0cf0e284aa065',
    publisher: '6065d9835ba0cf0e284aa06b',
    supplier: '6065d9835ba0cf0e284aa07d',
  },
  {
    title: 'The Great Gatsby',
    description:
      "A portrait of the Jazz Age in all of its decadence and excess, Gatsby captured the spirit of the author's generation and earned itself a permanent place in American mythology. Self-made, self-invented millionaire Jay Gatsby embodies some of Fitzgerald's--and his country's--most abiding obsessions: money, ambition, greed and the promise of new beginnings.",
    price: 1149.99,
    numberOfPages: 115,
    language: 'english',
    countInStock: 0,
    rating: 3.8,
    numReviews: 2,
    image: '/images/the_great_gatsby.jpg',
    writer: '6065d9835ba0cf0e284aa079',
    genre: '6065d9835ba0cf0e284aa060',
    publisher: '6065d9835ba0cf0e284aa06a',
    supplier: '6065d9835ba0cf0e284aa07e',
  },
  {
    title: 'Rebecca',
    description:
      "On a trip to the South of France, the shy heroine of Rebecca falls in love with Maxim de Winter, a handsome widower. Although his proposal comes as a surprise, she happily agrees to marry him. But as they arrive at her husband's home, Manderley, a change comes over Maxim, and the young bride is filled with dread. Friendless in the isolated mansion, she realises that she barely knows him. In every corner of every room is the phantom of his beautiful first wife, Rebecca, and the new Mrs de Winter walks in her shadow.",
    price: 799.0,
    numberOfPages: 432,
    language: 'english',
    countInStock: 1,
    rating: 4.0,
    numReviews: 5,
    image: '/images/rebecca.jpg',
    writer: '6065d9835ba0cf0e284aa077',
    genre: '6065d9835ba0cf0e284aa061',
    publisher: '6065d9835ba0cf0e284aa06b',
    supplier: '6065d9835ba0cf0e284aa07e',
  },
  {
    title: 'Child 44',
    description:
      "An ambitious secret police officer, Leo Demidov believes he's helping to build the perfect society. But when he uncovers evidence of a killer at large - a threat the state won't admit exists - Demidov must risk everything, including the lives of those he loves, in order to expose the truth. But what if the danger isn't from the killer he is trying to catch, but from the country he is fighting to protect?",
    price: 999.0,
    numberOfPages: 484,
    language: 'english',
    countInStock: 3,
    rating: 4.8,
    numReviews: 2,
    image: '/images/child44.jpg',
    writer: '6065d9835ba0cf0e284aa078',
    genre: '6065d9835ba0cf0e284aa067',
    publisher: '6065d9835ba0cf0e284aa06b',
    supplier: '6065d9835ba0cf0e284aa07e',
  },
];

export default products;
