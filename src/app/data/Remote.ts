import axios from 'axios';

export const getFirstDetailOrder = async () =>  await axios.get(
  'https://parseapi.back4app.com/classes/hotel/bVonXoSUHK',
  {
    headers: {
      'X-Parse-Application-Id': 'Rr9ZKgR2t2f49g5ueLWriacIrvKy8Hwv7P87FSw3',
      'X-Parse-REST-API-Key': '4C6gLjrbNGoym5m9j9mFQiDzXO5eETLxjUjY9Fzy',
    },
  },
);


export const getSecondDetailOrder = async () =>  await axios.get(
  'https://parseapi.back4app.com/classes/Review/pGLq0d1eLK',
  {
    headers: {
      'X-Parse-Application-Id': '5bKP3JX6zXWqpXMmI6tImTdZxDh59kb6IGVGlHHF',
      'X-Parse-REST-API-Key': 'ovP2x3YltGJsu1t9RM6FpDNgU5n2hnQSAhatLxIq',
    },
  },
);
