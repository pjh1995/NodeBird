import people from "../dummy/people";

const resolvers = {
  Query: {
    people: () => people,
  },
};

export default resolvers;
