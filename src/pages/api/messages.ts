import { prisma } from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { message, author } = req.body;
    try {
      const messageInstance = await prisma.post.create({
        data: {
          message,
          author,
        },
      });
      res.status(200).json(messageInstance);
    } catch (e) {
      console.log("Error", e);
      res.status(500).json({ error: e });
    }
  } else if (req.method === "GET") {
    try {
      const messagesInsance = await prisma.post.findMany({
        select: {
          id: true,
          message: true,
          author: true,
          createdAt: true,
          updatedAt: true,
        },
      });
      res.status(200).json(messagesInsance);
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: e });
    }
  }
}
