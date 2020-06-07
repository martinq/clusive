# Generated by Django 2.2.10 on 2020-06-05 12:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('library', '0011_annotation'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='annotation',
            options={'ordering': ['progression']},
        ),
        migrations.AddField(
            model_name='annotation',
            name='progression',
            field=models.FloatField(default=0),
            preserve_default=False,
        ),
    ]
