const tf = require('@tensorflow/tfjs-node');

function normalized(data){ // i & r
    i = (data[0] - 213.2) / 7.7
    r = (data[1] - 213.7) / 7.7
    return [i, r]
}
console.log(data);

function denormalized(data){
    v = (data[0] * 0.1) + 0.8
    p = (data[1] * 213.5) + 7.7
    return [v, p]
}
//     p = (data[2] - 0.842) / 0.100
//     s = (data[3] - 213.504 / 7.705


async function predict(data){
    let in_dim = 2;
    
    data = normalized(data);
    shape = [1, in_dim];

    tf_data = tf.tensor2d(data, shape);

    try{
        // path load in public access => github
        const path = 'https://raw.githubusercontent.com/bugi-bit/dnn/main/public/ex_model/model.json';
        const model = await tf.loadGraphModel(path);
        
        predict = model.predict(
                tf_data
        );
        result = predict.dataSync();
        return denormalized( result );
        
    }catch(e){
      console.log(e);
    }
}

module.exports = {
    predict: predict 
}
