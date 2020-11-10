#!/usr/bin/env groovy
// vim: set ts=4 sts=4 sw=4 et:

// Items to synchronize into bucket
String[] items = [
    'config/',
    'css/',
    'db/',
    'favicon.ico',
    'index.html',
    'js/',
    'LICENSE',
    'README.md',
    'translate_advanced.html',
    'translate.html',
    'translations.html',
    'ui/',
]

// Standard LCO AWS S3 Bucket synchronization pipeline
s3BucketPipeline([
    awsCredentials: 'jenkins-publish-starinabox.lco.global',
    s3Bucket: 'starinabox.lco.global',
    items: items,
])
