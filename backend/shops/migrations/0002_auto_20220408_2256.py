# Generated by Django 3.2.12 on 2022-04-08 22:56

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('shops', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='productcategory',
            name='shop',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='product_categories', to='shops.shop'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='product',
            name='product_category',
            field=models.ManyToManyField(blank=True, related_name='products', to='shops.ProductCategory'),
        ),
        migrations.AlterField(
            model_name='product',
            name='shop',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='products', to='shops.shop'),
        ),
        migrations.AlterField(
            model_name='shop',
            name='slug',
            field=models.SlugField(max_length=100, unique=True),
        ),
    ]
