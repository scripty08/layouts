import { READ, UPDATE, DESTROY } from './Constants';

export class Presenter {
    constructor(response) {
        this.response = response;
    }

    async present(interactorResponse) {
        const code = interactorResponse.code;
        const response = interactorResponse.response;

        switch (code) {
            case READ:
                this.response.send({
                    entries: [{
                        ...response._doc,
                    }]
                });
                break;
            case UPDATE:
                this.response.send({
                    entries: [{
                        ...response._doc,
                    }]
                });
                break;
            case DESTROY:
                this.response.send({
                    entries: [{
                        ...response._doc,
                    }]
                });
                break;
        }
    };

    presentError(code, error) {
        this.response.status(code).send(error);
    };
}
