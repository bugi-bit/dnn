const tf = require('@tensorflow/tfjs-node');

function normalized(data){ // i & r
    l = (data[0] - 213.266666666667) / 7.7072300277168
    r = (data[1] - 213.741666666667) / 7.7438012281854
    
    return [l, r]
}

function denormalized(data){
    p = (data[2] - 0.842083333333333) / 0.100312447725892
    s = (data[3] - 213.504166666667 / 7.70534668288758
    
      return [p, s]    
    
}


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
  
