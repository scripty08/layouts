import { BaseRepository } from './BaseRepository';
import { Logger } from '@scripty/logger/src/Logger';
import { DESTROY, READ, UPDATE } from './Constants';

export class Repository extends BaseRepository {

    constructor(Schema, db, collection) {
        super(Schema, db, collection);
    }

    async read(query, presenter) {
        try {
            const response = await this.model.find(query);
            presenter.present({code: READ, response: response});
        } catch (e) {
            Logger.error(e);
            presenter.presentError(500, 'could not read');
        }
    };

    async update(query, presenter) {
        let { _id, assignment, layout } = query;

        if (!_id) {
            _id = new this.db.mongo.ObjectID()
        }

        try {
            const response = await this.model.findOneAndUpdate(
                { _id },
                {
                    $set: {
                        assignment,
                        layout
                    }
                },
                { new: true, upsert: true }
            );

            presenter.present({code: UPDATE, response: response._doc});

        } catch (e) {
            Logger.error(e);
            presenter.presentError(500, 'could not update');
        }
    }

    async destroy(query, presenter) {
        let { _id } = query;
        try {
            const response = await this.model.findByIdAndRemove(_id);
            presenter.present({code: DESTROY, response: response_doc});
        } catch (e) {
            Logger.error(e);
            presenter.presentError(500, 'could not destroy');
        }
    }
}
