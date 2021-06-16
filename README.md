# journal
Keep a video diary!

https://user-images.githubusercontent.com/7946260/121240255-1d614500-c868-11eb-9d70-2e2e94bfadcd.mov


# Description

This project was built using Django, React, and [Mux](https://docs.mux.com/api-reference/video). It allows you to record, store, and replay short video entries.

# Getting started

1. Clone the repo

```
$ git clone https://github.com/bf6/journal-demo.git
$ cd journal
```

2. Create and activate virtual environment - I usually use [virtualenv](https://pypi.org/project/virtualenv/). You'll also need Python 3 installed.
```
$ virtualenv -p `which python3` venv
$ . venv/bin/activate
```

3. Install python dependencies
```
$ cd api
$ pip install -r requirements.txt
```

4. Set environment variables and start the api server
```
$ export MUX_ACCESS_TOKEN_ID="<your_id>" && export MUX_API_SECRET_KEY="<your_key>"
$ ./manage.py runserver
```

5. In another terminal session, install the frontend dependencies (I am using Node LTS (Fermium) v14.17.0)
```
$ cd journal/client/
$ yarn install
```

6. Run the app in development mode
```
$ yarn start
```

7. Visit `localhost:3000` in a browser

8. Run backend tests
```
$ cd journal/api/
$ ./manage.py test
```

# Overview

The approach takes advantage of Mux's [Direct Upload API](https://docs.mux.com/guides/video/upload-files-directly) which involves generating secure upload URLs on the server and passing them to the client.

The backend is a very simple Django app which uses [mux-python](https://github.com/muxinc/mux-python) - the official client library for Python maintained by Mux.

The frontend was created using Create React App, Typescript, and Tailwind CSS. The main components are the `VideoPlayer`, `VideoRecorder` (which does most of the heavy lifting), and the `RecordingList` which simply renders a list assets uploaded to Mux.
