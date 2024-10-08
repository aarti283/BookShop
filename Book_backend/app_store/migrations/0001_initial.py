# Generated by Django 5.0.1 on 2024-01-16 07:28

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Book',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=30)),
                ('price', models.IntegerField()),
                ('quantity', models.IntegerField()),
                ('Bought', models.BooleanField()),
            ],
        ),
        migrations.CreateModel(
            name='Customer',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30)),
                ('countt', models.IntegerField()),
                ('books', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='books', to='app_store.book')),
            ],
        ),
    ]
