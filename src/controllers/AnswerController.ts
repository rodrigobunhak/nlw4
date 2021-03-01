import { Request, Response } from "express"
import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/AppError";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";


class AnswerController {

    // http://localhost:3333/answers/2?u=5289226e-ba5a-4ede-9935-9051124586ee

    async execute(request: Request, response: Response) {
        const { value } = request.params;
        const { u } = request.query;
    
        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

        const surveyUser = await surveysUsersRepository.findOne({
            id: String(u)
        })

        if(!surveyUser) {
            throw new AppError("Survey User does not exist!");
        }

        surveyUser.value = Number(value);

        await surveysUsersRepository.save(surveyUser);

        return response.json(surveyUser);
    }
}

export { AnswerController }