import { generateEmbedding } from "@/libs/ai/embedding";
import prisma from "@/libs/db";
import { randomUUID } from "node:crypto";


async function backfillEmbedding() {

    const projects = await prisma.project.findMany({
        select: {
            id: true,
            name: true,
            description: true,
            status: true
        }
    })

    const tasks = await prisma.task.findMany({
        select: {
            id: true,
            name: true,
            description: true,
            status: true
        }
    })

    for (const project of projects) {
        const content = [
            `Project: ${project.name}`,
            `Description: ${project.description}`,
            `Status: ${project.status}`
        ].join("\n")

        const embedding = await generateEmbedding(content)

        await prisma.$executeRaw`
        INSERT INTO "SearchEmbedding" (
        "id",
        "projectId",
        "content",
        "embedding",
        "embeddingModel",
        "createdAt",
        "updatedAt"
        )
        VALUES (
        ${randomUUID()},
        ${project.id},
        ${content},
        ${JSON.stringify(embedding)}::vector(768),
        'gemini-embedding-2',
         NOW(), NOW()
        )

        ON CONFLICT ("projectId")
        DO UPDATE SET
        "content" = EXCLUDED."content",
        "embedding" = EXCLUDED."embedding",
        "embeddingModel" = EXCLUDED."embeddingModel",
        "updatedAt" = NOW()
        `

    }

    for (const task of tasks) {

        const content = [
            `Task: ${task.name}`,
            `Description: ${task.description}`,
            `Status: ${task.status}`
        ].join('\n')

        const embedding = await generateEmbedding(content)

        await prisma.$executeRaw`
        INSERT INTO "SearchEmbedding" (
        "id",
        "taskId",
        "content",
        "embedding",
        "embeddingModel",
        "createdAt",
        "updatedAt"
        )
        VALUES (
        ${randomUUID()},
        ${task.id},
        ${content},
        ${JSON.stringify(embedding)}::vector(768),
        'gemini-embedding-2',
         NOW(), NOW()
        )

        ON CONFLICT ("taskId")
        DO UPDATE SET

        "content" = EXCLUDED."content",
        "embedding" = EXCLUDED."embedding",
        "embeddingModel" = EXCLUDED."embeddingModel",
        "updatedAt" = NOW()
        `
    }

}

backfillEmbedding().catch(console.error).finally(
    async () => {
        await prisma.$disconnect
    }
)