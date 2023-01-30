function overideMethodGet(next) {
    this.where({
        $nor: [
            { deletedAt: { $type: 'date' } }
        ]
    })
    next()
}

export const softDelete = function (schema, options) {
    schema.add({
        deletedAt: {
            type: Date,
        }
    })

    schema.pre('find', overideMethodGet)
    schema.pre('findOne', overideMethodGet)

    schema.pre('count', overideMethodGet)
    schema.pre('estimatedDocumentCount', overideMethodGet)

    schema.statics.softDelete = async function (...args) {
        const result = await this.updateMany({
            ...args[0],
            $nor: [
                { deletedAt: { $type: 'date' } }
            ]
        }, {
            deletedAt: new Date(),
        })
        return {
            deletedCount: result.modifiedCount
        }
    }
}