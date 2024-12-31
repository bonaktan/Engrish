# Process Pipeline
_Taken from: Research Paper_
> Within the program, the students' speech was converted into text and analyzed using two tools. The first tool, a grammar checker, that identified user errors and provided feedback in text form. The second tool, an LLM, generated human-like responses in conversational form. These responses were converted back into audio using a text-to-speech component and delivered to the users, simulating real-life interactions.

## Client -> Server
The client sends audio, transmitted thru (????), from \<ConversationView> -> speechtotext()

## speechToText()
From there, it uses (???) to convert the audio to text, TAKE CARE TO LOOK AT IT FOR THE RRLS, then it calls 2 functions, generateResponse() and generateCorrections()

## generateResponse()
From there, it uses (???) to generate a response based on the user prompt. TAKE CARE TO LOOK AT THE RESPONSES FOR THE RRLS, then, it calls textToSpeech()

## textToSpeech()
It uses (???) to convert the AI prompt to English, TAKE CARE TO LOOK AT THE ACCENT AND QUIRKS OF THE PROGRAM., then it sends that to the Client

# generateCorrections()
It uses (???) to convert the user prompt to potential grammar corrections, TAKE CARE TO LOOK AT THE ACCURACY OF THE CORRECTIONS, then it sends that to the Client

## Server-Client
the textToSpeech() output is played as audio

the generateCorrections() output is displayed on \<GrammarCorrections>