# Generated by Django 2.2.4 on 2019-08-23 15:32

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('eventlog', '0002_auto_20190823_1529'),
    ]

    operations = [
        migrations.AlterField(
            model_name='session',
            name='startedAtTime',
            field=models.DateTimeField(default=datetime.datetime(2019, 8, 23, 15, 32, 2, 399956)),
        ),
    ]