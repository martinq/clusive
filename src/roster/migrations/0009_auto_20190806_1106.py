# Generated by Django 2.2.4 on 2019-08-06 15:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('roster', '0008_auto_20190802_1657'),
    ]

    operations = [
        migrations.AlterField(
            model_name='clusiveuser',
            name='anon_id',
            field=models.CharField(max_length=30, null=True, unique=True),
        ),
        migrations.AlterField(
            model_name='period',
            name='anon_id',
            field=models.CharField(max_length=30, null=True, unique=True),
        ),
        migrations.AlterField(
            model_name='site',
            name='anon_id',
            field=models.CharField(max_length=30, null=True, unique=True),
        ),
    ]