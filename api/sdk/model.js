const tf = require('@tensorflow/tfjs-node');

function normalized(data){ // i & r
    i = (data[0] - 213.267) / 7.707
    r = (data[1] - 213.741) / 7.743
    return [i, r]
}

function denormalized(data){
    v = (data[0] * 0.100) + 0.842
    p = (data[1] * 7.705) + 213.504
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
