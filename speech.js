//https://docs.microsoft.com/pt-br/azure/cognitive-services/speech-service/speech-sdk?tabs=nodejs%2Cubuntu%2Cios-xcode%2Cmac-xcode%2Candroid-studio#get-the-speech-sdk

(function () {
  // <code>
  "use strict";

  // pull in the required packages.
  var sdk = require("microsoft-cognitiveservices-speech-sdk");
  //var readline = require("readline");

  // replace with your own subscription key,
  // service region (e.g., "westus"), and
  // the name of the file you save the synthesized audio.
  var subscriptionKey = "43e65af46397439a9e734431bda31ea5";
  var serviceRegion = "centralus"; // e.g., "westus"
  var filename = "xpto.wav";

  // we are done with the setup

  // now create the audio-config pointing to our stream and
  // the speech config specifying the language.
  var audioConfig = sdk.AudioConfig.fromAudioFileOutput(filename);
  var speechConfig = sdk.SpeechConfig.fromSubscription(
    subscriptionKey,
    serviceRegion
  );

  // create the speech synthesizer.
  var synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);

  //   var rl = readline.createInterface({
  //     input: process.stdin,
  //     output: process.stdout,
  //   });

  //variavel com o texto que sera convertido em audio
  let text = "Let stay safe at home!";

  //   rl.question("Type some text that you want to speak...\n> ", function (text) {
  //     rl.close();
  // start the synthesizer and wait for a result.
  synthesizer.speakTextAsync(
    text,
    function (result) {
      if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
        console.log("synthesis finished.");
      } else {
        console.error(
          "Speech synthesis canceled, " +
            result.errorDetails +
            "\nDid you update the subscription info?"
        );
      }
      synthesizer.close();
      synthesizer = undefined;
    },
    function (err) {
      console.trace("err - " + err);
      synthesizer.close();
      synthesizer = undefined;
    }
  );
  console.log("Now synthesizing to: " + filename);
  // });
  // </code>
})();
