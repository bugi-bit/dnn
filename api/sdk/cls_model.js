const tf = require('@tensorflow/tfjs-node');

function normalized(data){ // i & r
    r = (data[0] - 213.267) / 7.707
    l = (data[1] - 213.741) / 7.743
//     p = (data[2] - 0.842) / 0.100
    s = (data[3] - 213.504 / 7.705
         return [r, l, s]
    }


const argFact = (compareFn) => (array) => array.map((el, idx) => [el, idx]).reduce(compareFn)[1]
const argMax = argFact((min, el) => (el[0] > min[0] ? el : min))

function ArgMax(res){
    label = "NORMAL"
    cls_data = []
    for(i=0; i<res.length; i++){
        cls_data[i] = res[i]
    }
    console.log(cls_data, argMax(cls_data));
    
    if(argMax(cls_data) == 1) {
        label = "CIL"
    }if(argMax(cls_data) == 2) {
        label = "CB"
    }if(argMax(cls_data) == 0) {
        label = "OK"
    }
    return label
}
async function classify(data){
    let in_dim = 4;
    
    data = normalized(data);
    shape = [1, in_dim];

    tf_data = tf.tensor2d(data, shape);

    try{
        // path load in public access => github
        const path = 'https://raw.githubusercontent.com/bugi-bit/dnn/main/public/cls_model/model.json';
        const model = await tf.loadGraphModel(path);
        
        predict = model.predict(
                tf_data
        );
        result = predict.dataSync();
        return ArgMax( result );
        
    }catch(e){
      console.log(e);
    }
}

module.exports = {
    classify: classify 
}
