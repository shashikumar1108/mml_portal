const mysqlCon = require('../connection');

class CommonQuery{

    async doQuery(queryToDo) {
        let pro = new Promise((resolve,reject) => {
            let query = queryToDo;
            mysqlCon.query(query, function (err, result) {
                if (err) throw err; // GESTION D'ERREURS
                result = Object.values(JSON.parse(JSON.stringify(result)));
                resolve(result);
            });
        })
        return pro.then((val) => {
            return val;
        })
    }

    async getRecords(table,where = '',select='*',sort=''){
        let data = {};
        try{
            let query = `select ${select} from ${table}`;
            if( where != '' ){
                query = query + ` where ${where}`;
            }

            if( sort != '' ){
                query = query + ` sort by ${sort}`;
            }
            console.log(query);

            return await this.doQuery(query);
            
        }catch(error){
            console.log(error)
            return data
        }
    }

    async updateRecord(table,where = '',set = ''){
        let data = {};
        try{
            let query = `update ${table} set ${set} where ${where} `;
            console.log(query);
            return await this.doQuery(query);
        }catch(error){
            console.log(error)
            return data
        }
    }

}

module.exports = new CommonQuery();