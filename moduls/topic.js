const qb=require('./db-mysql.js')


exports.creat=(topic,callback)=>{
 qb.query('insert into `topics` set ?',topic,(err,results)=>{
     if(err){
         callback(err)
     }
     callback(null,results)
 })
}

exports.delete=(id,callback)=>{
 qb.query('delete from `topics` where id=?',[id],(err,results)=>{
     if(err){
         callback(err)
     }
     callback(null,results)
 })
}


exports.update=(id,topic,callback)=>{
 qb.query('update `topics` set  title=?, content=? where id=?',[topic.title,topic.content,id],(err,results)=>{
     if(err){
         callback(err)
     }
     callback(null,results)
 })
}

exports.findAll=(callback)=>{
 qb.query('select * from `topics` order by `createdAt` desc',(err,results)=>{
     if(err){
         callback(err)
     }
     callback(null,results)
 })
}
 
exports.findById = (id, callback) => {
    console.log(id)
  const sqlStr = 'SELECT * FROM `topics` WHERE `id`=?'
  qb.query(sqlStr, [id], (err, results) => {
      console.log(results);
    if (err) {
      return callback(err)
    }
    callback(null, results[0])
  })
}