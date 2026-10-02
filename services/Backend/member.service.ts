import { getAuthUser } from "@/libs/auth/auth";
import prisma from "../../libs/db";
import { NextRequest } from "next/server";

export const memberService = {

    async createMember(projectid: string, member: string) {

        const addmember = await prisma.projectMember.create(
            {
                data: {
                    projectId: projectid,
                    teamMemberId: member,
                }
            }
        )

        return addmember
    },

    async getMember(projectid: string) {
        const getProjectMember = await prisma.projectMember.findMany(
            {
                where: {
                    projectId: projectid
                },
                include: {
                    user: {
                        select: {
                            id: true,
                            username: true,
                            email: true
                        }
                    },
                    project: true
                },

            }
        )
        return {
            project: getProjectMember[0]?.project,
            member: getProjectMember.map(elem => elem.user)
        }
    },

    async removeMember(projectid: string, member: string, request: NextRequest) {

        const admin = await getAuthUser(request)

        const user = await prisma.user.findUnique(
            {
                where: {
                    id: admin.userId
                }
            }
        )

        if (!user) {
            throw new Error('only admin can do this ')
        }

        const teamMember = await prisma.teamMember.findFirst(
            {
                where: {
                    userId: member,
                    adminId: admin.userId
                }
            }
        )

        if (!teamMember) {
            throw new Error("User is not found")
        }


        const deleteMember = await prisma.projectMember.delete(
            {
                where: {
                    teamMemberId_projectId: {
                        projectId: projectid,
                        teamMemberId: teamMember.id,
                    }
                }
            }
        )

        return deleteMember
    },

    async allProjectMember() {
        const getAllMember = await prisma.projectMember.findMany()
        return getAllMember
    }

}