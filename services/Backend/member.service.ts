import prisma from "../../libs/db";

export const memberService = {

    async createMember(projectid: string, member: string) {

        const addmember = await prisma.projectMember.create(
            {
                data: {
                    projectId: projectid,
                    userId: member,
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

    async removeMember(projectid: string, member: string) {

        const deleteMember = await prisma.projectMember.delete(
            {
                where: {
                    userId_projectId: {
                        projectId: projectid,
                        userId: member,
                    }
                }
            }
        )

        return deleteMember
    },

    async  allProjectMember (){
        const getAllMember = await prisma.projectMember.findMany()
        return getAllMember
    }
    
}