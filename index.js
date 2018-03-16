var fs = require('fs');

function readFileGetWord(callback) {
    // I'm gonna log before we async stuff
    console.log(3);
    fs.readFile('data.json', 'utf8',function (err, fileString) {
        // all the normal stuff is done, so let's show what this async did
        console.log(13);
        if (err) {
            callback(err);
            // if this returned a value where would it go?
            return
        }
        var data = JSON.parse(fileString);
        //this is weird for a callback to return a value, just think about it
        var words = callback(null, data[0]);
        console.log("Value returned from callback inside readFileGetWord:", words);
        // this will wrap up readFile
        console.log(16);

        //where does this string go?
        return "more words";
    });

    // he's asyncing, so I'll log while he's busy
    console.log(4);

    //it is weird for the "node-pattern of handling async problems" to return something (don't do this) 
    //but I want you to think about this to fully understand async flow of execution
    //and to understand the difference between an async function and a callback
    return "return";
}

function addNumbers(a, b, callback) {
    // you called?
    console.log(6);
    var notANumber = callback(null, a + b);
    console.log("Value returned from callback in addNumbers:", notANumber);
    // callback is done, NOW we log 8
    console.log(8);
    //it is weird for the "node-pattern of handling async problems" to return something (don't do this) 
    //but I want you to think about this to fully understand async flow of execution
    //and to understand the difference between an async function and a callback
    return "dog";
}


function start() {
    var text, number;

    // log 2 before we ACTUALLY start
    console.log(2)
    text = readFileGetWord(function (err, word) {
        // this is the callback used in readFile. Finally we get to log
        console.log(14);

        if (err) {
            console.log(err);
            // if this returned a value where would it go?
            return;
        }

        console.log("Word from file:", word);
        // let's log before we finish this callback
        console.log(15);

        //this return is also weird, just want you to think about it
        return "this is weird";
    })

    // we're back from readFileGetWord
    console.log(5);
    number = addNumbers(2, 3, function (err, sum) {
        if(err){
            console.log(err);
            //if this returned a value where would it go?
            return;
        }
        // log 7 next as we wait for the callback
        console.log(7);
        console.log("Sum:", sum);
        //this return is also weird, just want you to think about it
        return "not a number";
    });

    // we've got our requested values, so we'll go from here
    console.log(9);
    console.log("Value returned from addNumbers:", number);
    console.log(10);
    console.log("Value returned from readFileGetWord:", text);
    console.log(11);
}

// log 1 before start
console.log(1);
start();
// much to my surprise, we log this, but we're not done
console.log(12);