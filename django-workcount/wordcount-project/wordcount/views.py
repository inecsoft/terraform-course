from django.http import HttpResponse
from django.shortcuts import render
import operator

def homepage(request):
    return render(request, 'home.html', {'hithere':'This is me learning django'})

def count(request):
    fulltext = request.GET['fulltext']
    # print(fulltext)
    wordList = fulltext.split()
    wordDict = {}

    for word in wordList:
        if word in wordDict:
            wordDict[word] += 1
        else:
            wordDict[word] = 1

    # sortedWords = sorted(wordDict.items(), key=lambda x: x[1], reverse=True)
    sortedWords = sorted(wordDict.items(), key=operator.itemgetter(1), reverse=True)
    return render(request, 'count.html', {'fulltext':fulltext, 'count':len(wordList), 'sortedWords': sortedWords })


def about(request):
    return render(request, 'about.html')