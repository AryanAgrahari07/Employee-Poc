const { GraphQLError } = require("graphql");
const { encodeCursor, decodeCursor } = require("../../utils/pagination");
const prisma = require("../../db/prisma");

const ALLOWED_SORT_FIELDS = ["name", "age", "class", "createdAt", "attendance"];

async function employees(parent, args, ctx) {
  const first = Math.min(args.first || 10, 50);
  const after = args.after ? decodeCursor(args.after) : null;
  const filter = args.filter || {};
  const sort = args.sort || { field: "createdAt", direction: "DESC" };

  if (!ALLOWED_SORT_FIELDS.includes(sort.field)) {
    throw new GraphQLError("Invalid sort field");
  }

  // Build Prisma where
  const where = {};
  if (filter.nameContains) {
    where.name = { contains: filter.nameContains, mode: "insensitive" };
  }
  if (filter.minAge != null) where.age = { ...where.age, gte: filter.minAge };
  if (filter.maxAge != null) where.age = { ...where.age, lte: filter.maxAge };
  if (filter.class) where.class = filter.class;

  // Cursor-based pagination: use createdAt + id for stable ordering or just id
  const orderBy = {};
  orderBy[sort.field] = sort.direction.toLowerCase();

  const take = first;
  const cursorClause = after ? { id: after } : undefined;

  // If cursor provided, skip cursor itself
  const employees = await prisma.employee.findMany({
    where,
    orderBy,
    take: take + 1,
    ...(cursorClause ? { cursor: cursorClause, skip: 1 } : {})
  });

  const hasNextPage = employees.length > first;
  const sliced = hasNextPage ? employees.slice(0, -1) : employees;

  const edges = sliced.map((e) => ({ cursor: encodeCursor(e.id), node: e }));
  const endCursor = edges.length ? edges[edges.length - 1].cursor : null;
  const totalCount = await prisma.employee.count({ where });

  return {
    edges,
    pageInfo: { endCursor, hasNextPage },
    totalCount
  };
}

module.exports = { employees };
